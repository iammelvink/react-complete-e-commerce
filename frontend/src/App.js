import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					{/* LoginScreen */}
					<Route path='/login' component={LoginScreen} />
					{/* RegisterScreen */}
					<Route path='/register' component={RegisterScreen} />
					{/* ProfileScreen */}
					<Route path='/profile' component={ProfileScreen} />
					{/* ShippingScreen */}
					<Route path='/shipping' component={ShippingScreen} />
					{/* PaymentScreen */}
					<Route path='/payment' component={PaymentScreen} />
					{/* PlaceOrderScreen */}
					<Route path='/placeorder' component={PlaceOrderScreen} />
					{/* ProductScreen */}
					<Route path='/product/:id' component={ProductScreen} />
					{/* CartScreen */}
					<Route path='/cart/:id?' component={CartScreen} />
					{/* HomeScreen */}
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
