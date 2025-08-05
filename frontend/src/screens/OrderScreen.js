import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useHistory } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match }) => {
  const history = useHistory();
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const [sdkReady, setSdkReady] = useState(false);

  // Redirect after payment success or if paid and not delivered
  useEffect(() => {
    if (order && userInfo && !userInfo.isAdmin) {
      // Redirect to customer order list after successful payment
      if (successPay) {
        history.push('/myorders');
      }
    }
  }, [order, userInfo, successPay, orderId, history]);

  useEffect(() => {
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

    if (order && !loading) {
      order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
    }
  }, [order, loading]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };


  if (loading) return <Loader />;
  if (error) return <Message variant='danger'>{error}</Message>;
  if (!order || !order._id) {
    return <Message variant='danger'>Order not found or you do not have access to this order.</Message>;
  }
  // Defensive: check for missing user or shipping info
  if (!order.user || !order.shippingAddress) {
    return <Message variant='danger'>Order data is incomplete. Please check the backend or database for missing fields.</Message>;
  }

  return (
    <>
      <div>
        <Link to={userInfo.isAdmin ? '/admin/orderlist' : '/profile'} className='btn btn-light my-3'>
          Go Back
        </Link>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <span className='push-to-right'>
                    <strong>Name: </strong> {order.user.name}
                  </span>
                </p>
                <p>
                  <span className='push-to-right'>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </span>
                </p>
                <p>
                  <span className='push-to-right'>
                    <strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </span>
                </p>
                {order.isDelivered ? (
                  <div style={{ color: 'green', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    <FaCheckCircle style={{ marginRight: 6 }} /> Delivered
                  </div>
                ) : (
                  <div style={{ color: 'red', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    <i className='fas fa-times' style={{ marginRight: 6 }}></i> Not Delivered
                  </div>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <span className='push-to-right'>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </span>
                </p>
                {order.isPaid ? (
                  <div style={{ color: 'green', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    <FaCheckCircle style={{ marginRight: 6 }} /> Paid
                  </div>
                ) : (
                  <div style={{ color: 'red', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    <i className='fas fa-times' style={{ marginRight: 6 }}></i> Not Paid
                  </div>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Your order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x R{item.price} = R{item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item className='push-to-right'>
                  <Row>
                    <Col>Items</Col>
                    <Col>R{order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='push-to-right'>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>R{order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='push-to-right'>
                  <Row>
                    <Col>Tax</Col>
                    <Col>R{order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='push-to-right'>
                  <Row>
                    <Col><strong>Total</strong></Col>
                    <Col><strong>R{order.totalPrice}</strong></Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? <Loader /> : (
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                    )}
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderScreen;