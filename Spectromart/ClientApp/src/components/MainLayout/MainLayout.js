import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IdleTimer from 'react-idle-timer';
import { actionCreators as authenticationActions } from '../../store/Authentication';

class MainLaiout extends Component {
    constructor(props) {
        super(props);
        this.idleTimer = null;
    }

    render() {
        return (
            <Fragment>
                {this.props.idleTimeout ? <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    element={document}
                    onIdle={this.props.logout}
                    timeout={60000 * this.props.idleTimeout} /> : ''}
                {this.props.children}
            </Fragment>
        )
    };
}

let mapState = (state) => {
    return {
        idleTimeout: state.authentication && state.authentication.auth ? state.authentication.auth.idleTimeout : 0
    };
};

let mapDispatch = (dispatch) => {
    return {
        logout: bindActionCreators(authenticationActions.logout, dispatch)
    };
};


export default connect(mapState, mapDispatch)(MainLaiout);