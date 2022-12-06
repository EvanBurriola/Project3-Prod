import styles from './ErrorNotification.module.css'

import CloseButton from 'react-bootstrap/CloseButton'

/**
 * Creating error notifications for when and error occurs
 *  
 * @author ??
 */
const ErrorNotification = ({error, onComplete, ...props}) => {

    return (
        <div className={`${styles.notification}`} onAnimationEnd={onComplete}>
            <span className='d-flex align-items-center'>
                {`ERROR: ${error}`}
                <CloseButton 
                    aria-label="Close notification" 
                    variant="white" 
                    className='ms-2' 
                    onClick={onComplete}
                />
            </span>
        </div>
    )
}

export default ErrorNotification