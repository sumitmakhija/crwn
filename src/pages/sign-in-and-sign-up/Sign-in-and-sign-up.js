import React from 'react'
import './Sign-in-and-sign-up.scss'
import Signin from '../../components/SignIn/Sign-in'
import SignUp from '../../components/sign-up/SignUp'
import {Outlet} from 'react-router-dom';

const Signinandsignup = () => {
    return (
        <div className='sign-in-and-sign-up'>

            <Signin />

            <SignUp />
            <Outlet/>
        </div>
    )
}

export default Signinandsignup
