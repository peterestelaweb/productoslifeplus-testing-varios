import { useState, useEffect } from 'react';
import './PaymentErrorPage.css';

const PaymentErrorPage = () => {
  const [errorType, setErrorType] = useState('general');

  useEffect(() => {
    // Detectar tipo de error basado en URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');

    if (error) {
      setErrorType(error);
    }
  }, []);

  const handleTryAgain = () => {
    window.location.href = '/';
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:soporte@lifeplus.com?subject=Problema con el pago';
  };

  const getErrorMessage = () => {
    switch (errorType) {
      case 'card_declined':
        return 'Tu tarjeta fue rechazada. Por favor, intenta con otro método de pago.';
      case 'expired_card':
        return 'Tu tarjeta ha expirado. Por favor, usa una tarjeta válida.';
      case 'insufficient_funds':
        return 'Fondos insuficientes. Por favor, intenta con otro método de pago.';
      case 'processing_error':
        return 'Error procesando el pago. Por favor, inténtalo de nuevo.';
      default:
        return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.';
    }
  };

  return (
    <div className="payment-error-container">
      <div className="error-card">
        <div className="error-icon">
          <div className="error-circle">
            <div className="error-x">×</div>
          </div>
        </div>

        <h1 className="error-title">Oops! Algo salió mal</h1>

        <p className="error-message">
          {getErrorMessage()}
        </p>

        <div className="error-details">
          <h3>Posibles soluciones:</h3>
          <ul>
            <li>Verifica que los datos de tu tarjeta sean correctos</li>
            <li>Intenta con otra tarjeta o método de pago</li>
            <li>Comprueba que tengas fondos suficientes</li>
            <li>Espera unos minutos e inténtalo nuevamente</li>
          </ul>
        </div>

        <div className="action-buttons">
          <button
            onClick={handleTryAgain}
            className="retry-button"
          >
            🔄 Intentar de Nuevo
          </button>

          <button
            onClick={handleContactSupport}
            className="support-button"
          >
            📧 Contactar Soporte
          </button>
        </div>

        <div className="additional-options">
          <h4>Otras opciones:</h4>
          <div className="option-cards">
            <div className="option-card">
              <div className="option-icon">💳</div>
              <h5>Diferente Tarjeta</h5>
              <p>Usa otra tarjeta de crédito o débito</p>
            </div>
            <div className="option-card">
              <div className="option-icon">📱</div>
              <h5>Apple/Google Pay</h5>
              <p>Paga de forma rápida y segura con tu wallet</p>
            </div>
            <div className="option-card">
              <div className="option-icon">💬</div>
              <h5>Soporte en Vivo</h5>
              <p>Chatea con nuestro equipo de soporte</p>
            </div>
          </div>
        </div>

        <div className="security-note">
          <div className="security-icon">🔒</div>
          <p>
            Tus datos están seguros. Nunca almacenamos información sensible de tu tarjeta.
          </p>
        </div>

        <div className="help-section">
          <h3>¿Necesitas ayuda?</h3>
          <p>
            Nuestro equipo de soporte está disponible para ayudarte:
          </p>
          <div className="contact-methods">
            <a href="mailto:soporte@lifeplus.com" className="contact-link">
              📧 soporte@lifeplus.com
            </a>
            <span className="separator">|</span>
            <a href="tel:+34912345678" className="contact-link">
              📞 +34 912 345 678
            </a>
          </div>
          <p className="support-hours">
            Horario: Lunes a Viernes, 9:00 - 18:00 (CET)
          </p>
        </div>
      </div>
    </div>
  );
};

export { PaymentErrorPage };
export default PaymentErrorPage;