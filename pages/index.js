import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Index.module.css'
import logo from '@/public/assets/logo.png'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

export default function Index() {
  return (
      <Container fluid>
            <Row className='h-100 align-items-center'>
                <Row className={`justify-content-center`}>
                    <div className={styles.logoContainer}>
                        <Image
                            src={logo}
                            alt="Spin and Stone logo"
                        /> 
                    </div>
                </Row>
                <Row className={`justify-content-center`}>
                    <Col md={4} className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='w-50 my-2'>
                            <Button href="/manager" className={`w-100 ${styles.btnSNS}`}>Manage Store</Button>
                        </div>
                        <div className='w-50 my-2'>
                            <Button href="/server" className={`w-100 ${styles.btnSNS}`}>Take Orders</Button>
                        </div>
                        <div className='w-50 my-2'>
                            <Button href="/customer" className={`w-100 ${styles.btnSNS}`}>Self-Service</Button>
                        </div>
                    </Col>
                </Row>
            </Row>
      </Container>
    )
}