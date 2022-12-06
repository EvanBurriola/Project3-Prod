import styles from './TypeSelector.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { updateFilter } from '@/store/slices/filter'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

export default function TypeSelector({choices, ...props}) {
    const dispatch = useDispatch()
    const activeFilter = useSelector((state) => state.filter.itemFilter)

    return (
        <div className='d-flex flex-wrap justify-content-center'>
            {choices.map((item) => {
                return (
                    <Col md={3} className={`d-flex justify-content-center`} key={item.name}>
                        <Button 
                            className={`mx-4 w-100 py-3 shadow ${styles.btnChoice} ${(activeFilter == item.type) ? styles.activeBtn : ""}`}
                            onClick={() => dispatch(updateFilter(item.type))}
                            >
                                {item.icon()} {item.name}
                        </Button>
                    </Col>
                )
            })
            }
        </div>
    )
}