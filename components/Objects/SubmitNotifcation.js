import styles from './SubmitNotification.module.css'

export default function SubmitNotification({...props}) {
    return (
        <div className={`${styles.orderSuccess}`} onAnimationEnd={props.onAnimationEnd}>
            <span>Order Submitted</span>
        </div>
    )
}