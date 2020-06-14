import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={MainPage}></Route>
                <Route path='/login' component={LoginPage}></Route>
                <Route path='/register' component={RegisterPage}></Route>
            </Switch>
        )
    }
}
