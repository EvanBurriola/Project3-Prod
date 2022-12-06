import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCustomer } from '@/store/slices/order'


/**
 * Creating a popup to type in the name for the order
 *  
 * @author ??
 */
const NameModal = ({...props}) => {
    const dispatch = useDispatch()
    const [customerName, setCustomerName] = useState("")

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="customer-name-input-modal"
            centered
            >
            <Modal.Header>
                <Modal.Title id="customer-name-input-modal">
                    Order Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup>
                    <Form.Control
                        placeholder="Customer Name"
                        aria-label="Customer name"
                        onChange={(event) => setCustomerName(event.target.value)}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => dispatch(setCustomer(customerName))}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NameModal