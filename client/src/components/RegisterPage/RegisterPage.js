import React, { Component } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import AppNavbar from '../AppNavBar/AppNavbar';
import './RegisterPage.css';

export default class RegisterPage extends Component {
    render() {
        return (
            <div className="register-root-background">
               <div className="register-bg"></div>
                <div className="register-blur-screen">
                     <AppNavbar  className="register-page-navbar" isAlpha={true}/>
                    <div className="register-form-container">
                        <div className="register-form">
                            <RegisterForm />
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}
