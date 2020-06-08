import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AppBody from "./AppBody";


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={AppBody}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </Switch>
        )
    }
}
