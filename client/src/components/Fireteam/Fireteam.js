import React, { Component } from 'react'

export default class Fireteam extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>{this.props.fireteam.time_created}</h3>
            </div>
        )
    }
}
