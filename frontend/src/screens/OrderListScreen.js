import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch()

	const orderList = useSelector((state) => state.orderList)
	const { loading, error, orders } = orderList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders())
		} else {
			history.push('/login')
		}
	}, [dispatch, userInfo, history])

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>User</th>
							<th>Date</th>
							<th>Total</th>
							<th>Paid</th>
							<th>Delivered</th>
							{/* <th>Info</th> removed */}
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>R{order.totalPrice}</td>
<td>
  {/* Debug: Log order object and order._id for troubleshooting */}
  {console.log('Order row:', order)}
  {order.isPaid ? (
	<span style={{ color: 'green', fontWeight: 600 }}>
	  <FaCheckCircle style={{ marginRight: 4 }} /> Paid
	</span>
  ) : (
	<span style={{ color: 'red', fontWeight: 600 }}>
	  <i className='fas fa-times' style={{ marginRight: 4 }}></i> Not Paid
	</span>
  )}
</td>
<td>
  {order.isDelivered ? (
	<span style={{ color: 'green', fontWeight: 600 }}>
	  <FaCheckCircle style={{ marginRight: 4 }} /> Delivered
	</span>
  ) : (
	<span style={{ color: 'red', fontWeight: 600 }}>
	  <i className='fas fa-times' style={{ marginRight: 4 }}></i> Not Delivered
	</span>
  )}
</td>
								{/* Details button removed */}
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default OrderListScreen
