import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        {/* Sairam */}
                        <a
                            rel='noopener noreferrer'
                            href='https://github.com/sairam017'
                            target='_blank'
                            className='Sairam'
                        >
                            <i className='fas fa-user-circle'></i> sairam Github
                        </a>
                        <span style={{ marginLeft: '10px' }}>
                            Copyright &copy; React E-Commerce
                        </span>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer