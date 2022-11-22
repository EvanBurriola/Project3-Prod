import { prisma } from '@/lib/prisma'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Receipt from '@/components/Objects/Receipt'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearOrder } from '@/store/slices/order'

export async function getServerSideProps(context) {
    // grab orderid passed in route
    const id = parseInt(context.params.id)
    if (Number.isNaN(id)) {
        return {
            props: { order: null }
        }
    }

    // grab order from db
    const order = await prisma.customerorders.findUnique({
        where: {
            orderid: id,
        },
    })

    if (!order) {
        return {
            props: { order }
        }
    }

    // serialize date since json can't parse the type
    // returned by prisma schema
    const serialOrder = JSON.parse(JSON.stringify(order))

    const pizzas = await prisma.pizzaorders.findMany({
        where: {
            orderid: id,
        },
        include: {
            pizzas: true,
        },
    })

    return {
        props: {
            order: serialOrder,
            pizzas,
        }
    }
}

export default function OrderReceipt({order, pizzas}) {
    const fullOrder = {
        order,
        pizzas
    }
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearOrder())
        const timer = setTimeout(() => {
            router.push("/customer")
        }, 5000);
    });

    return (
        <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Row className="text-center justify-content-center">
                <h2 className='text-muted mb-5'>Thank You For Your Order!</h2>
                <Receipt info={fullOrder}/>
            </Row>
        </Container>
    )
}