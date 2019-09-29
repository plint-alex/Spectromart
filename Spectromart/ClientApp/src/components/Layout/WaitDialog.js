import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
//import Modal from '@material-ui/core/Modal';
//import Fade from '@material-ui/core/Fade';

const WaitDialog = props => (
    <Dialog
        open={props.loading}
        transitionDuration={{ enter: 1000, exit: 1000 }}
    > <div></div>
    </Dialog>
);


let mapState = (state) => {

    return {
        loading: state.layout.loading
    };
};

export default connect(mapState)(WaitDialog);