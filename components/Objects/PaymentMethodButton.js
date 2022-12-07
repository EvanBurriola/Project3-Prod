import styles from './PaymentMethodButton.module.css'
import Button from "react-bootstrap/Button"

const PaymentButton = ({method, onClick, active, ...props}) => {

    return (
        <div>
            <Button 
                variant="light" 
                className={`${styles.btn} ${active && styles.active} py-3 px-4`} 
                onClick={onClick}
            >
                <span className='w-100 fs-3'>{method.icon}</span>
                {method.name}
            </Button>
        </div>
    )
}

export default PaymentButton