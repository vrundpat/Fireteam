import React, { Component } from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import { connect } from 'react-redux';
import { create_fireteam, join_fireteam, all_fireteams, get_fireteam } from '../../actions/fireteamActions';


class MainPage extends Component {

    // componentDidMount() {
    //     this.timer = setInterval(() => this.props.all_fireteams(), 2000);
    // }

    
    // componentWillUnmount() {
    //     clearInterval(this.timer);
    //     this.timer = null;
    // }

    render() {
        return (
            <div>
                <AppNavbar />
                {/* Input generation of all fireteams */}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated,
    user: state.authReducer.user,
    error_msg: state.errorReducer.error_msg,
    error_status: state.errorReducer.status,
    fireteamState: state.fireteamReducer

});

export default connect(mapStateToProps, { create_fireteam, join_fireteam, all_fireteams, get_fireteam })(MainPage);


