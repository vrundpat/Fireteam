import React, { Component } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import AppNavbar from '../AppNavBar/AppNavbar';
import './RegisterPage.css';

export default class RegisterPage extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <RegisterForm />
            </div>
        )
    }
}
