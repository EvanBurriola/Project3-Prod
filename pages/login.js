import React, { Component } from 'react'
import styles from "@/styles/login.module.css"
import Image from 'next/image'
import logo from '@/public/assets/logo.png'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { useSession, signIn, signOut } from "next-auth/react"

const AuthContainer = ({session}) => {

    const signInHandler = () =>{
        signIn('google',{
            callbackUrl: "/"
        })
    }

    const signOutHandler = () =>{
        signOut({callbackUrl: "/login"})
    }

    if (session) {
        return (
            <div>
                <p className="fs-3 mb-3">Signed in as {session.user.email}</p>
                <div className='w-100'>
                    <button className={`btn btn-primary w-100 ${styles.btnSNS}`} onClick={() => signOutHandler()}>Sign out</button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <p className="fs-3 mb-3">Not signed in</p>
            <button  className={`btn btn-primary w-100 ${styles.btnSNS}`} onClick={() => signInHandler()}>Sign in</button>
        </div>
    )
}

export default function Login() {
    const { data: session } = useSession()

    return (
        <Container>
            <Row className='h-100 align-items-center'>
                <Row>
                    <Col className={`${styles.title}`}>
                        <div className={styles.logoContainer}>
                            <Image
                                src={logo}
                                alt="Spin and Stone logo"
                            /> 
                        </div>
                        
                        <h3 className="title">Spin &apos;N Stone POS Sign In</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <AuthContainer session={session} />
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}
Login.noAuthRequired = true