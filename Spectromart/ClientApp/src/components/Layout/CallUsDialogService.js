import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Entities';
import { renderTextField, renderCheckbox } from '../common/Controls';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

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
        //flexWrap: 'wrap',
        //flexDirection: 'column',
        alignItems: 'center',
        //maxWidth: 400,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    field: {
        width: '100%',
    },
    addEntityButton: {
        margin: theme.spacing(3, 0, 2),
    },
    span: {
        margin: theme.spacing(0, 0, 0, 2),
    },

});
class CallUsDialogService extends Component {
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
            <Grid container spacing={3} className={classes.paper}>
                <Grid item xs={12}>
                    <h3>Информация</h3>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field className={classes.field} component={renderTextField} name="organizationName" label="Название организации"
                    autoComplete="organizationName"/* autoFocus*/
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field className={classes.field} component={renderTextField} name="name" label="Контактное лицо" rowsMax="4"
                    autoComplete="name"/* autoFocus*/
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field className={classes.field} component={renderTextField} name="phoneNumber" label="Номер телефона"
                    autoComplete="phoneNumber"/* autoFocus*/
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field className={classes.field} component={renderTextField} name="email" label="E-Mail"
                    autoComplete="email"/* autoFocus*/
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field className={classes.field} component={renderTextField} name="responsible" label="Ответственный за ремонт"
                    autoComplete="responsible"/* autoFocus*/
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Field className={classes.field} component={renderTextField} name="address" label="Адрес нахождения оборудования"
                    autoComplete="address"/* autoFocus*/
                    />
                </Grid>

                <Grid item xs={12}>
                    <h3>Оброрудование</h3>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field className={classes.field} component={renderTextField} name="equipmentType" label="Тип оборудования"
                        autoComplete="equipmentType"/* autoFocus*/
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field className={classes.field} component={renderTextField} name="equipmentModel" label="Модель" 
                        autoComplete="equipmentModel"/* autoFocus*/
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field className={classes.field} component={renderTextField} name="serialNumber" label="Серийный номер"
                        autoComplete="serialNumber"/* autoFocus*/
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field className={classes.field} component={renderTextField} name="guarantee" label="Гарантийный/не гарантийный"
                        autoComplete="guarantee"/* autoFocus*/
                    />
                </Grid>
                <Grid item xs={12}>
                    <h3>Описание проблем с оборудованием</h3>
                </Grid>
                <Grid item xs={12}>
                    <Field className={classes.field} component={renderTextField} name="description" label="Описание" multiline rows="4"
                        autoComplete="description"/* autoFocus*/
                    />
                </Grid>
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
            </Grid>
        )
    };
}

CallUsDialogService = reduxForm({
    form: 'Entity', // a unique identifier for this form
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    validate
})(CallUsDialogService);


let mapState = (state) => {

    return {
        callUsDialogServiceOpen: state.layout.callUsDialogServiceOpen
    };
};

let mapDispatch = (dispatch) => {
    return {
        onAddEntity: bindActionCreators(actionCreators.addEntity, dispatch),
    };
};


const ConnectedCallUsDialogService = connect(mapState, mapDispatch)(CallUsDialogService);


const StyledCallUsDialogService = (props) => {
    return <ConnectedCallUsDialogService {...props} />;
}

export default withRouter(withStyles(styles)(StyledCallUsDialogService));