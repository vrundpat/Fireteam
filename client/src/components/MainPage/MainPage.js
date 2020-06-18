import React, { Component } from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import { connect } from 'react-redux';
import { create_fireteam, join_fireteam, all_fireteams, get_fireteam } from '../../actions/fireteamActions';
import Fireteam, {} from '../Fireteam/Fireteam';
import './MainPage.css';

class MainPage extends Component {

    componentWillMount() {
        // this.timer = setInterval(() => this.props.all_fireteams(), 2000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        return (
            <div className="mainpage-background-root">
                <AppNavbar />
                <h1>Insert Jumbotron Here</h1>
               <div className="all-fireteams-contianer">
                    <Fireteam fireteam={{
                        leader: {},
                        members: [],
                        activity_type: "Raid",
                        description: "",
                        platform: "",
                        capacity: "",
                        time_created: ""
                    }} />
                    {/* {this.props.fireteamState.all_fireteams.map(fireteam => (<div key={fireteam}> <Fireteam fireteam={fireteam} /> </div>))} */}
                </div>
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


