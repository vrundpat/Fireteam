import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import AppNavbar, {} from '../AppNavBar/AppNavbar';
import './LoginPage.css';

export default class LoginPage extends Component {
    render() {
        return (
            <div className="root-background">
               <div className="bg"></div>
               <div className="lightning flashit"></div>
               <div className="blur-screen">
                    <AppNavbar  className="login-page-navbar" isAlpha={true}/>
                    <div className="login-form-container">
                        <div className="login-form">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
