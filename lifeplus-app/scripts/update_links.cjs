
const fs = require('fs');
const path = require('path');

// Rutas
const htmlPath = path.resolve(__dirname, '../../index.html');
const productsJsPath = path.resolve(__dirname, '../src/data/products.js');

console.log('Leyendo HTML original de:', htmlPath);
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Extraer productos del HTML
// Enfoque simplificado: Buscar code, luego buscar el siguiente link
const linkMap = {};
// Regex para encontrar el código
const codeRegex = /class="product-code">\s*(\d+)\s*<\/span>/g;
let codeMatch;
let htmlCursor = 0;
let foundCodes = 0;

while ((codeMatch = codeRegex.exec(htmlContent)) !== null) {
    const code = codeMatch[1];
    foundCodes++;
    // Buscar el siguiente enlace DESPUÉS de encontrar el código
    const linkRegex = /href="([^"]+)"[^>]*class="product-link"/;
    // Cortamos el HTML desde donde encontramos el código
    const remainingHtml = htmlContent.substring(codeMatch.index);
    const linkMatch = linkRegex.exec(remainingHtml);

    // Solo aceptamos si el link está relativamente cerca (ej: dentro de los siguientes 1000 caracteres)
    // para evitar falsos positivos si un producto no tiene link
    if (linkMatch && linkMatch.index < 1000) {
        linkMap[code] = linkMatch[1];
    }
}
console.log(`Encontrados parser: Códigos=${foundCodes}, Enlaces mapeados=${Object.keys(linkMap).length}`);


// Leer products.js
console.log('Leyendo products.js de:', productsJsPath);
let jsContent = fs.readFileSync(productsJsPath, 'utf-8');

// Limpiar para parsear JSON
// Buscamos específicamente el bloque de products
const startMarker = 'export const products =';
const startIndex = jsContent.indexOf(startMarker);
if (startIndex === -1) {
    console.error('No se encontró "export const products ="');
    process.exit(1);
}

// Buscamos el cierre del array products.
// Asumimos que termina con ];
// Buscamos el primer ]; desupés del inicio
const endMarker = '];';
const endIndex = jsContent.indexOf(endMarker, startIndex);

if (endIndex === -1) {
    console.error('No se encontró el cierre "];" del array products');
    process.exit(1);
}

// Extraemos lo que hay entre el = y el ];
// El + startMarker.length nos pone después del =
// El endIndex + 1 incluye el ]
let jsonString = jsContent.substring(startIndex + startMarker.length, endIndex + 1).trim();

console.log(`Intentando parsear JSON de longitud ${jsonString.length}`);

let products;
try {
    // Intentar limpieza básica
    // A veces tiene un ; al final si nos equivocamos con índices
    if (jsonString.endsWith(';')) jsonString = jsonString.slice(0, -1);

    // Evaluar como JS es lo más seguro dado que es un archivo JS
    products = eval(jsonString);
    console.log(`Parseados ${products.length} productos.`);
} catch (e) {
    console.error('Error fatal parseando productos:', e.message);
    process.exit(1);
}

// Actualizar productos
let updatedCount = 0;
products = products.map(p => {
    // ID formato: lifeplus-CODE
    const code = p.id.replace('lifeplus-', '');
    if (linkMap[code]) {
        p.originalLink = linkMap[code];
        updatedCount++;
    } else {
        console.warn(`No se encontró enlace original para producto ${p.id} (Código: ${code})`);
    }
    return p;
});

console.log(`Actualizados ${updatedCount} productos con enlaces originales.`);

// Guardar de nuevo
const newJsContent = `export const products = ${JSON.stringify(products, null, 2)}`;
fs.writeFileSync(productsJsPath, newJsContent, 'utf-8');
console.log('products.js actualizado correctamente.');
