import React, { Component } from 'react';
import './AppJumbotron.css';
import { Jumbotron } from 'reactstrap';
import AppNavBar from '../AppNavBar/AppNavbar'

export default class AppJumbotron extends Component {
    render() {
        return (
            <div className="jumbotron-root">
                <Jumbotron>
                    <h1 className="display-3">Hello, world!</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                </Jumbotron>
            </div>
        )
    }
}
