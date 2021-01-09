import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
	listProducts,
	deleteProduct,
	createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
const ProductListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)
	const { loading, error, products, page, pages } = productList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const productDelete = useSelector((state) => state.productDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET })

		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login')
		}
		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`)
		} else {
			dispatch(listProducts('', pageNumber))
		}
	}, [
		dispatch,
		userInfo,
		history,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id))
		}
	}

	const createProductHandler = () => {
		dispatch(createProduct())
	}

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<span className='plus-sign-margin'>
							<i className='fas fa-plus'></i>
						</span>
						Create Product
					</Button>
				</Col>
			</Row>
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Brand</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>R{product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									{/* Edit button */}
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
									</td>
									{/* Delete button */}
									<td>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(product._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	)
}

export default ProductListScreen
