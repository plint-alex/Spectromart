import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Entities';
import { renderTextField, renderCheckbox } from '../common/Controls';

import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

//import Modal from '@material-ui/core/Modal';
//import Fade from '@material-ui/core/Fade';


const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Заполните поле'
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Заполните поле'
    }
    if (!values.organizationName) {
        errors.organizationName = 'Заполните поле'
    }
    return errors
}

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        maxWidth: 400,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    addEntityButton: {
        margin: theme.spacing(3, 0, 2),
    },
    span: {
        margin: theme.spacing(0, 0, 0, 2),
    },

});
class CallUsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entityId: props.match.params.id,
        };
    }
    render() {
        const { handleSubmit, onAddEntity, classes, closeDialog, entityId } = this.props;
        const color = entityId ? 'secondary' : 'primary';
        return (
            <div className={classes.paper}>
                <Field component={renderTextField} name="name" label="Ваше имя"
                    autoComplete="name"/* autoFocus*/
                />
                <Field component={renderTextField} name="phoneNumber" label="Номер телефона"
                    autoComplete="phoneNumber"/* autoFocus*/
                />
                <Field component={renderTextField} name="organizationName" label="Название организации"
                    autoComplete="organizationName"/* autoFocus*/
                />

                <Button
                    type="button"
                    variant="contained"
                    color={color}
                    className={classes.addEntityButton}
                    onClick={handleSubmit(data => { onAddEntity({ name: data.name + '; ' + data.organizationName, description: (entityId ? entityId + '; ' : '') + data.phoneNumber, parentIds: ['00000000-0000-0000-0000-000000000004'] }); if (closeDialog) { closeDialog(); } })}
                >
                    {entityId && 'Узнать точную цену'}
                    {!entityId && 'Отправить'}
                </Button>
            </div>
        )
    };
}

CallUsDialog = reduxForm({
    form: 'CallUsDialog', // a unique identifier for this form
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    validate
})(CallUsDialog);


let mapState = (state) => {

    return {
        callUsDialogOpen: state.layout.callUsDialogOpen
    };
};

let mapDispatch = (dispatch) => {
    return {
        onAddEntity: bindActionCreators(actionCreators.addEntity, dispatch),
    };
};


const ConnectedCallUsDialog = connect(mapState, mapDispatch)(CallUsDialog);


const StyledCallUsDialog = (props) => {
    return <ConnectedCallUsDialog {...props} />;
}

export default withRouter(withStyles(styles)(StyledCallUsDialog));