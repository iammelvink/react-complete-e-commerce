import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { FaCheckCircle, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders, deliverOrder } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDeliver])

  const deliverHandler = (orderId) => {
    if (window.confirm('Are you sure you want to mark this order as delivered?')) {
      dispatch(deliverOrder(orderId))
    }
  }

  return (
    <>
      <h1>Orders</h1>
      {loadingDeliver && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>R{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    <span style={{ color: 'green' }}>
                      <FaCheckCircle /> {order.paidAt.substring(0, 10)}
                    </span>
                  ) : (
                    <span style={{ color: 'red' }}>
                      <FaTimes />
                    </span>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span style={{ color: 'green' }}>
                      <FaCheckCircle /> {order.deliveredAt.substring(0, 10)}
                    </span>
                  ) : (
                    <span style={{ color: 'red' }}>
                      <FaTimes />
                    </span>
                  )}
                </td>
                <td>
                  {/* Details button removed for admin */}
                  {!order.isDelivered && (
                    <Button
                      variant='success'
                      className='btn-sm'
                      onClick={() => deliverHandler(order._id)}
                      disabled={loadingDeliver}
                    >
                      Mark Delivered
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen