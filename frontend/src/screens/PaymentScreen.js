
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Image, Alert } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import CheckoutSteps from '../components/CheckoutSteps';
import { payOrder, createOrder } from '../actions/orderActions';



const PaymentScreen = ({ location }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [paid, setPaid] = React.useState(false);

  // Get cart and user info
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  // Create order when payment is done
  const handlePaymentDone = () => {
	localStorage.setItem('paymentMethod', JSON.stringify('QR/UPI'));
	setPaid(true);
	// Post order to backend
	dispatch(
	  createOrder({
		orderItems: cart.cartItems,
		shippingAddress: cart.shippingAddress,
		paymentMethod: 'QR/UPI',
		itemsPrice: cart.itemsPrice,
		shippingPrice: cart.shippingPrice,
		taxPrice: cart.taxPrice,
		totalPrice: cart.totalPrice,
	  })
	);
  };

  // When order is created, mark as paid and redirect
  React.useEffect(() => {
  if (success && order) {
	dispatch(payOrder(order._id, { status: 'QR/UPI Paid' }));
	history.push(`/order/${order._id}`); // Redirect to OrderScreen for order status
  }
  }, [success, order, dispatch, history]);

  return (
	<>
	  <CheckoutSteps step1 step2 step3 />
	  <Row className="justify-content-center">
		<Col md={6} className="text-center">
		  <h2>Scan & Pay</h2>
		  <p>Scan the QR code below using any UPI app (PhonePe, Google Pay, Paytm, etc.) to complete your payment.</p>
		  <Image src="/images/PhonePe_QR.jpg" alt="PhonePe QR" fluid style={{ maxWidth: 320, margin: '0 auto' }} />
		  <div className="my-3">
			<Button variant="success" size="lg" onClick={handlePaymentDone} disabled={paid}>
			  {paid ? 'Payment Success!' : 'Payment Done'}
			</Button>
		  </div>
		  {paid && (
			<Alert variant="success" className="d-flex align-items-center justify-content-center">
			  <FaCheckCircle style={{ color: 'green', fontSize: 32, marginRight: 10 }} />
			  Payment received! Redirecting to your orders list...
			</Alert>
		  )}
		</Col>
	  </Row>
	</>
  );
};

export default PaymentScreen;
