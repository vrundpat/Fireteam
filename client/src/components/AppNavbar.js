import React, { Component } from 'react';
import { NavLink as RRNavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button,
  } from 'reactstrap';

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.loggedInNavBar.bind(this);
        this.guestNavBar.bind(this);
        this.logout.bind(this);
    }

    logout = () => this.props.logout();
    
    loggedInNavBar = () => {
        return (
            <Nav className ="ml-auto">
                <NavItem>
                    <NavbarText>Welcome: {this.props.user.username}</NavbarText>
                </NavItem>

                <NavItem>
                    <Button onClick={this.logout} style={{marginLeft:"20px"}}>Logout</Button>
                    {this.props.user === null ? <Redirect to='/'></Redirect> : null}
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

export default connect(mapStateToProps, { logout })(AppNavbar);

