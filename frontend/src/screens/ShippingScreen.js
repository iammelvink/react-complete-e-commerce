import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = () => {
  // useSelector is to grab the cart from the state
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
	e.preventDefault();
	dispatch(saveShippingAddress({ address, city, postalCode, country }));
	history.push('/payment');
  };


  return (
	<FormContainer>
	  <CheckoutSteps step1 step2 />
	  <h1>Shipping</h1>
	  <Form onSubmit={submitHandler}>
		{/* Address */}
		<Form.Group controlId="address" className="mb-3">
		  <Form.Label>Address</Form.Label>
		  <Form.Control
			type="text"
			placeholder="Enter address"
			value={address}
			required
			onChange={(e) => setAddress(e.target.value)}
			autoComplete="shipping street-address"
		  />
		</Form.Group>
		{/* City */}
		<Form.Group controlId="city" className="mb-3">
		  <Form.Label>City</Form.Label>
		  <Form.Control
			type="text"
			placeholder="Enter city"
			value={city}
			required
			onChange={(e) => setCity(e.target.value)}
			autoComplete="shipping address-level2"
		  />
		</Form.Group>
		{/* Postal Code */}
		<Form.Group controlId="postalCode" className="mb-3">
		  <Form.Label>Postal Code</Form.Label>
		  <Form.Control
			type="text"
			placeholder="Enter postal code"
			value={postalCode}
			required
			onChange={(e) => setPostalCode(e.target.value)}
			autoComplete="shipping postal-code"
		  />
		</Form.Group>
		{/* Country */}
		<Form.Group controlId="country" className="mb-3">
		  <Form.Label>Country</Form.Label>
		  <Form.Control
			type="text"
			placeholder="Enter country"
			value={country}
			required
			onChange={(e) => setCountry(e.target.value)}
			autoComplete="shipping country"
		  />
		</Form.Group>
		<Button type="submit" variant="primary">
		  Continue
		</Button>
	  </Form>
	</FormContainer>
  );
}

export default ShippingScreen;
