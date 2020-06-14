import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import AppNavbar, {} from '../AppNavBar/AppNavbar';
import './LoginPage.css';

export default class LoginPage extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <LoginForm />
            </div>
        )
    }
}
