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
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

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
					{/* OrderScreen */}
					<Route path='/order/:id' component={OrderScreen} />
					{/* ProductScreen */}
					<Route path='/product/:id' component={ProductScreen} />
					{/* CartScreen */}
					<Route path='/cart/:id?' component={CartScreen} />
					{/* UserListScreen */}
					<Route path='/admin/userlist' component={UserListScreen} />
					{/* UserEditScreen */}
					<Route path='/admin/user/:id/edit' component={UserEditScreen} />
					{/* ProductListScreen */}
					<Route
						path='/admin/productlist'
						component={ProductListScreen}
						exact
					/>
					{/* ProductListScreen Page number */}
					<Route
						path='/admin/productlist/:pageNumber'
						component={ProductListScreen}
						exact
					/>
					{/* ProductEditScreen */}
					<Route path='/admin/product/:id/edit' component={ProductEditScreen} />
					{/* OrderListScreen */}
					<Route path='/admin/orderlist' component={OrderListScreen} />
					{/* HomeScreen Search */}
					<Route path='/search/:keyword' component={HomeScreen} exact />
					{/* HomeScreen Search Page number */}
					<Route
						path='/search/:keyword/page/:pageNumber'
						component={HomeScreen}
						exact
					/>
					{/* HomeScreen Page number */}
					<Route path='/page/:pageNumber' component={HomeScreen} exact />
					{/* HomeScreen */}
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
