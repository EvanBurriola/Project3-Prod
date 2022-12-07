import Image from 'next/image'
import styles from './Images.module.css'

export function Images({...props}) {
    if (!props.image) {
        return <></>
    }

    return (
        <div className={styles.pizzaPosition}>
            <Image
                src={'/assets/Toppings/' + props.image}
                alt="Topping Image"
                width="100vh"
                height="100vh"
            />
        </div>
    );
}