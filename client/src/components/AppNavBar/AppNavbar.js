import React, { Component } from 'react';
import { NavLink as RRNavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import './AppNavbar.css';

import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button,
    Container,
    NavbarToggler,
  } from 'reactstrap';

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = { collapsed: false }
        this.loggedInNavBar.bind(this);
        this.guestNavBar.bind(this);
        this.logout.bind(this);
        this.toggleCollapse.bind(this);
    }

    toggleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    logout = () => this.props.logout();
    
    loggedInNavBar = () => {
        return (
            <Nav className="ml-auto">
                <NavItem>
                    <NavbarText>Welcome: {this.props.user.username}</NavbarText>
                </NavItem>

                <NavItem>
                    <Button onClick={this.logout} id="logout-btn">Logout</Button>
                    {this.props.user === null ? <Redirect to='/'></Redirect> : null}
                </NavItem>
            </Nav>
        )
    }

    guestNavBar = () => {
        return (
            <Nav  className="ml-auto" navbar>
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
                <Navbar color="dark" dark expand="md" className="app-navbar">
                    <Container>
                        <NavbarBrand activeClassName="active" to="/" tag={RRNavLink} id="navbar-brand">Fireteam</NavbarBrand>
                        <NavbarToggler onClick={this.toggleCollapse}></NavbarToggler>
                        <Collapse isOpen={this.state.collapsed} navbar>
                            {this.props.authenticated ? this.loggedInNavBar() : this.guestNavBar()}
                        </Collapse>
                    </Container>
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

