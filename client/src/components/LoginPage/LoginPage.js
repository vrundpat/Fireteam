import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import AppNavbar, {} from '../AppNavBar/AppNavbar';
import './LoginPage.css';

export default class LoginPage extends Component {
    render() {
        return (
            // <div className="root-background">
            //     <AppNavbar className="app-navbar"/>
            //     <div className="holder">
            //         {/* <AppNavbar className="app-navbar"/> */}
            //         <div className="login-img"></div>
            //         <div className="login-form">
            //             <LoginForm />
            //         </div>
            //     </div>
            // </div>
            <div className="root-background">
                <div className="blur-screen">
                    <AppNavbar className="app-navbar"/>
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

