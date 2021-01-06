import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	// Make sure user is logged in to access this page
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	// make request here upon component load
	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login')
			} else {
				if (!user.name) {
					dispatch(getUserDetails('profile'))
				} else {
					setName(user.name)
					setEmail(user.email)
				}
			}
		},
		[dispatch, history, userInfo, user] // Dependencies, on change they fire off useEffect
	)

	const submitHandler = (e) => {
		e.preventDefault()
		// Check if passwords match
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			// Dispatch update profile
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{/* 
            On error, display message/error
            When loading, display Loading... */}
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					{/* Name */}
					<Form.Group controlId='email'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>
					{/* Email */}
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					{/* Password */}
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					{/* Confirm Password */}
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					{/* Button */}
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My orders</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
