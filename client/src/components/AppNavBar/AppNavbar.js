import React, { Component } from 'react';
import { NavLink as RRNavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import './AppNavbar.css';
import { Fragment } from 'react';

import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
  } from 'reactstrap';

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = { collapsed: false }
        this.toggleAlpha = this.props.isAlpha
        this.loggedInNavBar.bind(this);
        this.guestNavBar.bind(this);
        this.logout.bind(this);
        this.toggleCollapse.bind(this);
        this.navbar.bind(this);
        this.navbarConstants.bind(this);
        this.navbarLinks.bind(this);
    }

    toggleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    navbarLinks = () => {
        return (
            <Fragment>
                <NavItem>
                    <NavLink className="navlinks" activeClassName="active" href="https://www.bungie.net/">Bungie</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className="navlinks" activeClassName="active" href="https://www.bungie.net/en/Forums/">Forums</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className="navlinks" activeClassName="active" href="https://www.bungie.net/en/ClanV2/MyClans">Clans</NavLink>
                </NavItem>
            </Fragment>
        )
    }

    logout = () => this.props.logout();
    
    loggedInNavBar = () => {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavbarBrand className="navlinks"><span className="fa fa-user-circle" id="navbarUser"><span id="navbar-user">{this.props.user.username}</span></span></NavbarBrand>
                </NavItem>
                <NavItem>
                    <NavLink className="navlinks logout-link" onClick={this.props.logout}>Logout</NavLink>
                    {this.props.user === null ? <Redirect to='/'></Redirect> : null}
                </NavItem>
                {this.navbarLinks()}
            </Nav>
        )
    }

    guestNavBar = () => {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink className="navlinks" activeClassName="active" to="/login" tag={RRNavLink}>Login</NavLink>
                </NavItem>
                <NavItem>
                   <NavLink className="navlinks" activeClassName="active" to="/register" tag={RRNavLink}>Register</NavLink>
                </NavItem>
                {this.navbarLinks()}
            </Nav>
        )
    }

    navbarConstants = () => {
        return (
            <div className="navbar-container">
                <NavbarBrand activeClassName="active" to="/" tag={RRNavLink} id="navbar-brand"><span className="fa fa-cubes"></span>Fireteam</NavbarBrand>
                <NavbarToggler onClick={this.toggleCollapse}></NavbarToggler>
                <Collapse isOpen={this.state.collapsed} navbar>
                    {this.props.authenticated ? this.loggedInNavBar() : this.guestNavBar()}
                </Collapse>
            </div>
        )
    }

    navbar = () => {
        if (!this.toggleAlpha) return ( <Navbar dark expand="md" className="no-alpha-navbar" navbar> {this.navbarConstants()} </Navbar>)
        else return ( <Navbar dark expand="md" className="alpha-navbar" navbar> {this.navbarConstants()} </Navbar>)
    }

    render() {
        return (
            <>
                {this.navbar()}
            </>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated,
    user: state.authReducer.user
});

export default connect(mapStateToProps, { logout })(AppNavbar);

