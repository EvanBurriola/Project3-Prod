import styles from './SubmitNotification.module.css'

/**
 * Creating a notification for when an order is submitted on the server view
 *  
 * @author ??
 */
export default function SubmitNotification({...props}) {
    return (
        <div className={`${styles.orderSuccess}`} onAnimationEnd={props.onAnimationEnd}>
            <span>Order Submitted</span>
        </div>
    )
}