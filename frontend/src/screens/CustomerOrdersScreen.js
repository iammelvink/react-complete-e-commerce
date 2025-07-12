import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col } from 'react-bootstrap';
import { listMyOrders } from '../actions/orderActions';

const CustomerOrdersScreen = () => {
  const dispatch = useDispatch();
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <Row className="justify-content-center">
      <Col md={10}>
        <h2>My Orders</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Item(s)</th>
                <th>Total</th>
                <th>Delivery</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name ? order.user.name : (userInfo && userInfo.name)}</td>
                  <td>
                    {order.orderItems && order.orderItems.map((item) => (
                      <div key={item.product}>{item.name} (₹{item.price})</div>
                    ))}
                  </td>
                  <td>
                    {order.totalPrice && order.totalPrice > 0
                      ? `₹${order.totalPrice}`
                      : order.orderItems && order.orderItems.length > 0
                        ? `₹${order.orderItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)}`
                        : '₹0'}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span style={{ color: 'green' }}>Delivered</span>
                    ) : (
                      <span style={{ color: 'red' }}>Not Delivered</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default CustomerOrdersScreen;
