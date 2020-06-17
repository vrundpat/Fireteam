import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import AppNavbar, {} from '../AppNavBar/AppNavbar';
import './LoginPage.css';

export default class LoginPage extends Component {
    render() {
        return (
            <div className="login-root-background">
               <div className="login-bg"></div>
               <div className="login-lightning login-flashit"></div>
               <div className="login-blur-screen">
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
