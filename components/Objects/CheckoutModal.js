import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import PaymentButton from '@/components/Objects/PaymentMethodButton'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomer } from '@/store/slices/order'


const CheckoutModal = ({onSubmit, isSubmitting, handleClose, ...props}) => {
    const name = useSelector((state) => state.order.customername)
    const dispatch = useDispatch()
    const [canSubmit, setCanSubmit] = useState(false)
    const [methodSelected, setPaymentMethod] = useState("")

    useEffect(() => {
        if (name !== "" && methodSelected !== "") {
            setCanSubmit(true)
        } else {
            setCanSubmit(false)
        }

    }, [name, methodSelected])

    const methods = [
        {
            name: 'Cash',
            icon: <i className="fa-solid fa-money-bill-1 w-100"></i>
        },
        {
            name: 'Card',
            icon: <i className="fa-brands fa-cc-visa w-100"></i>
        },
        {
            name: 'Gift Card',
            icon: <i className="fa-solid fa-credit-card w-100"></i>
        }
    ]

    return (
        <Modal
            {...props}
            onHide={handleClose}
            size="md"
            aria-labelledby="information-input-modal"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="information-input-modal">
                    Ready To Checkout?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <FloatingLabel
                        controlId="floatingName"
                        label="Your Name"
                        className="mb-3"
                    >
                        <Form.Control
                            placeholder="John Smith"
                            aria-label="Name Input"
                            onChange={(event) => dispatch(setCustomer(event.target.value))}
                        />
                    </FloatingLabel>
                </div>

                <Row className={`justify-content-around border-top pt-3`}>
                    <h5 className='text-dark'>Choose Payment Method</h5>
                    {methods.map(item => {
                        return (
                            <Col key={item.name}>
                                <PaymentButton method={item} active={methodSelected === item.name} onClick={() => setPaymentMethod(item.name)} />
                            </Col>
                        )
                    })
                    }
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Form onSubmit={onSubmit}>
                    <Button 
                        type="submit" 
                        disabled={!canSubmit}
                    >
                        
                        {isSubmitting && <Spinner 
                                as="span"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                animation="border"
                                className="me-1"
                            /> 
                        }
                        Submit
                    </Button>
                </Form>
            </Modal.Footer>
        </Modal>
    )
}

export default CheckoutModal