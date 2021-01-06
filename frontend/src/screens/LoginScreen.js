import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split('=')[1] : '/'

	// make request here upon component load
	useEffect(
		() => {
			if (userInfo) {
				history.push(redirect)
			}
		},
		[history, userInfo, redirect] // Dependencies, on change they fire off useEffect
	)

	const submitHandler = (e) => {
		e.preventDefault()
		// Dispatch login
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{/* 
            On error, display error
            When loading, display Loading... */}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
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
				{/* Button */}
				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>
			{/* Register */}
			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
