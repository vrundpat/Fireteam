import React, { Component } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
  } from 'reactstrap';

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.loggedInNavBar.bind(this);
        this.guestNavBar.bind(this);
    }

    loggedInNavBar = () => {
        return (
            <Nav className ="ml-auto">
                <NavItem>
                    <NavbarText>Welcome: {this.props.user.username}</NavbarText>
                </NavItem>
            </Nav>
        )
    }

    guestNavBar = () => {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink activeClassName="active" to="/login" tag={RRNavLink}>Login</NavLink>
                </NavItem>
                <NavItem>
                   <NavLink activeClassName="active" to="/register" tag={RRNavLink}>Register</NavLink>
                 </NavItem>
            </Nav>
        )
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md" style={{minHeight:"100px"}}>
                    <NavbarBrand activeClassName="active" to="/" tag={RRNavLink} className='lead' style={{fontSize:"32px"}}>FireTeam</NavbarBrand>
                    <Collapse navbar>
                        {this.props.authenticated ? this.loggedInNavBar() : this.guestNavBar()}
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated,
    user: state.authReducer.user
});

export default connect(mapStateToProps, {})(AppNavbar);

