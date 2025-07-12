import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Image, Alert } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import CheckoutSteps from '../components/CheckoutSteps';

import { payOrder, createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';



const PaymentScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [paid, setPaid] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  // Get cart and order info
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  // Calculate prices (copied from PlaceOrderScreen)
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 1000 ? 0 : 150);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = addDecimals(
    (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
  );


  // Reset orderCreate state on mount and after payment
  React.useEffect(() => {
    dispatch({ type: ORDER_CREATE_RESET });
    setPaid(false);
  }, [dispatch]);

  // When order is created, mark it as paid
  React.useEffect(() => {
    if (success && order && order._id && !paid) {
      dispatch(
        payOrder(order._id, {
          id: order._id,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          payer: { email_address: cart.shippingAddress?.email || 'customer@example.com' },
        })
      );
      setOrderId(order._id);
      setPaid(true);
      // Reset orderCreate state after payment
      setTimeout(() => {
        dispatch({ type: ORDER_CREATE_RESET });
      }, 1000);
    }
  }, [success, order, paid, dispatch, cart.shippingAddress]);

  // Optionally redirect to order details after payment
  // React.useEffect(() => {
  //   if (paid && orderId) {
  //     history.push(`/order/${orderId}`);
  //   }
  // }, [paid, orderId, history]);

  const handlePaymentDone = () => {
    localStorage.setItem('paymentMethod', JSON.stringify('QR/UPI'));
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: 'QR/UPI',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h2>Scan & Pay</h2>
          <p>
            Scan the QR code below using any UPI app (PhonePe, Google Pay, Paytm, etc.) to complete your payment.
          </p>
          <Image src="/images/PhonePe_QR.jpg" alt="PhonePe QR" fluid style={{ maxWidth: 320, margin: '0 auto' }} />
          <div className="my-3">
            <Button variant="primary" className="mb-3" onClick={() => history.push('/myorders')}>
              Go to Orders List
            </Button>
            <br />
            <Button variant="success" size="lg" onClick={handlePaymentDone} disabled={cart.cartItems.length === 0}>
              {paid ? 'Payment Success!' : 'Payment Done'}
            </Button>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {paid && (
            <Alert variant="success" className="d-flex align-items-center justify-content-center">
              <FaCheckCircle style={{ color: 'green', fontSize: 32, marginRight: 10 }} />
              Payment received! Now you can go to your orders list.
            </Alert>
          )}
        </Col>
      </Row>
    </>
  );
};

export default PaymentScreen;