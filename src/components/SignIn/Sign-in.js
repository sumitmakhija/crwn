import React, { Component } from 'react';
import './Sign-in.scss'
import Forminput from '../form-input/form-input';
import CustomButton from '../custom-button/CustomButton';
import {auth,signInWithGoogle} from '../firebase/firebase.utils';

class Signin extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }

    };

    handleSubmit= async event=>{
        event.preventDefault();
        const {email,password}=this.state;
        try{
            await auth.signInWithEmailAndPassword(email,password);
        }catch(error){
            console.log(error);

        }

        this.setState({email:'' , password:''})
    }
    handleChange=event=>{
        const {value,name}=event.target;
        this.setState({[name]:value})
    };
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <p>Sign in with your email and password</p>
                <form onSubmit={this.handleSubmit}>
                    <Forminput name="email" type="email" label='email' value={this.state.email} handleChange={this.handleChange} required/>
                    <Forminput name="password" type="password" label='password' value={this.state.password} handleChange={this.handleChange} required/>
                    
                    <div className='buttons'>

                    <CustomButton  type="submit" >SIGN IN</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>{' '} Sign in with Google {' '}</CustomButton>


                    </div>
                </form>
            </div>
        );
    }
}

export default Signin;