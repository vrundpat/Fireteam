import React, { Component } from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import { connect } from 'react-redux';
import { create_fireteam, join_fireteam, all_fireteams, get_fireteam } from '../../actions/fireteamActions';
import Fireteam, {} from '../Fireteam/Fireteam';
import './MainPage.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.generate_fireteams.bind(this);
    }

    generate_fireteams = () => {
        var temp = []
        for (var i = 0; i < this.props.fireteamState.all_fireteams.length; i++) {
            temp.push(<Fireteam fireteam={this.props.fireteamState.all_fireteams[i]} />);
        }

        return temp;
    }

    componentWillMount() {
        // this.timer = setInterval(() => this.props.all_fireteams(), 2000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {

        var test = {
            leader: {"username": "Leader", "light_level": 1000},
            current_members: [{"username" : "test1", "light_level": 1000}, {"username" : "test2", "light_level": 1000}, {"username" : "test3", "light_level": 1000}, {"username" : "test4", "light_level": 1000}, {"username" : "test5", "light_level": 1000}, {"username" : "test6", "light_level": 1000}],
            activity_type: "Raid",
            description: "Need help with Prophecy dungeon /join",
            platform: "PS4",
            capacity: "6",
            time_created: "..."
        }

        return (
            <div className="mainpage-background-root">
                <AppNavbar />
                <h1>Insert Jumbotron Here</h1>
               <div className="all-fireteams-contianer">
                    <Fireteam fireteam={test} />
                    {/* {this.generate_fireteams()} */}
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


