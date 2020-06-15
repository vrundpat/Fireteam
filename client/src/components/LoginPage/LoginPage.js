import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import AppNavbar, {} from '../AppNavBar/AppNavbar';
import './LoginPage.css';

export default class LoginPage extends Component {
    render() {
        return (
            <div className="root-background">
                <div className="app-navbar">
                    <AppNavbar/>
                </div>
                <div className="login-form-container">
                    <div className="logn-form">
                        <LoginForm/>
                    </div>
                </div>
            </div>
        )
    }
}
