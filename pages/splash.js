import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Index.module.css'
import logo from '@/public/assets/logo.png'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import { Wrapper } from "@googlemaps/react-wrapper"
import { Map, Marker } from '@/components/GoogleMaps'

export default function Splash() {

    // location of spin n stone pizza
    const location = {
        lat: 30.612343,
        lng: -96.3436352
    }

    return (
        <>
            <Head>
                <title>SNS Pizza | Welcome!</title>
            </Head>

            <Container fluid>
                <Row className='h-100 align-items-center'>
                    <Row className={`justify-content-center`}>
                        <div className={styles.logoContainer}>
                            <Image
                                src={logo}
                                alt="Spin and Stone logo"
                            /> 
                            <h1>Welcome to Spin &#39;N Stone!</h1>
                        </div>
                    </Row>
                    <Row className={`h-50 justify-content-center`}>
                        <div className='d-flex w-50 h-100'>
                            <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} render={(status) => <h1>{status}</h1>}>
                                <Map center={location} zoom={15} style={{width: "100%"}}>
                                    <Marker position={location} label="Spin N Stone" />
                                </Map>
                            </Wrapper>
                        </div>
                    </Row>
                    <Row className={`justify-content-center`}>
                        <Col md={4} className='d-flex flex-column justify-content-center align-items-center'>
                            <div className='w-50 my-2'>
                                <Button href="/customer" className={`w-100 py-3 ${styles.btnSNS}`}>Start Your Order</Button>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </>
    )
}