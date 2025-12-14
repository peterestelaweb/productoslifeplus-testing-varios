import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Track analytics
    if (window.gtag) {
      gtag('event', 'purchase', {
        transaction_id: searchParams.get('session_id') || 'unknown',
        value: searchParams.get('amount') || 0,
        currency: 'EUR'
      });
    }

    // Simular obtención de detalles del pedido
    const sessionId = searchParams.get('session_id');
    const amount = searchParams.get('amount');

    if (sessionId || amount) {
      setOrderDetails({
        sessionId: sessionId,
        amount: amount ? parseFloat(amount).toFixed(2) : '0.00',
        date: new Date().toLocaleDateString('es-ES')
      });
    }
  }, [searchParams]);

  const handleContinueShopping = () => {
    window.location.href = '/';
  };

  return (
    <div className="payment-success-container">
      <div className="success-card">
        <div className="success-icon">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
        </div>

        <h1 className="success-title">¡Gracias por tu compra!</h1>

        <p className="success-message">
          Tu pedido ha sido procesado exitosamente.
        </p>

        <p className="success-submessage">
          Recibirás un email de confirmación en breve con los detalles de tu pedido.
        </p>

        {orderDetails && (
          <div className="order-summary">
            <h3>Resumen del Pedido</h3>
            <div className="order-details">
              <div className="detail-row">
                <span>Fecha:</span>
                <span>{orderDetails.date}</span>
              </div>
              <div className="detail-row">
                <span>Monto:</span>
                <span className="amount">€{orderDetails.amount}</span>
              </div>
              {orderDetails.sessionId && (
                <div className="detail-row">
                  <span>ID de Transacción:</span>
                  <span className="transaction-id">{orderDetails.sessionId}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="action-buttons">
          <button
            onClick={handleContinueShopping}
            className="continue-shopping-button"
          >
            🛒 Continuar Comprando
          </button>
        </div>

        <div className="contact-info">
          <p>
            ¿Necesitas ayuda?
            <a href="mailto:soporte@lifeplus.com"> Contactar soporte</a>
          </p>
        </div>

        <div className="next-steps">
          <h4>¿Qué sigue?</h4>
          <ul>
            <li>✅ Recibirás confirmación por email</li>
            <li>✅ Tu pedido será procesado en 24-48 horas</li>
            <li>✅ Recibirás número de seguimiento</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { PaymentSuccessPage };
export default PaymentSuccessPage;