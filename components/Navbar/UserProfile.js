import styles from './UserProfile.module.css'

import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'next/image'

import { signOut } from 'next-auth/react'

const UserProfile = ({user, ...props}) => {
    return (
        <Dropdown align="end" className={`mx-1`}>
            <Dropdown.Toggle id="profile-dropdown" className={`p-1 d-flex ${styles.profileBtn}`}>
                <Image 
                    src={user.image} 
                    alt={"User Profile Image"}
                    width={32}
                    height={32}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Header>{user.fullname}</Dropdown.Header>
                <Dropdown.Item onClick={() => signOut()}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    {' '}
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserProfile