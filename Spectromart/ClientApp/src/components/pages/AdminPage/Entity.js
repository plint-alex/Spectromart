import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { actionCreators } from '../../../store/Entities';
import { actionCreators as filesActionCreators } from '../../../store/Files';
import { renderTextField, renderCheckbox } from '../../common/Controls';
import File from './File';

import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';


const validate = values => {
    const errors = {}
    //if (!values.name) {
    //    errors.name = 'Заполните поле'
    //}
    //if (!values.description) {
    //    errors.description = 'Заполните поле'
    //}
    return errors
}

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        maxWidth: '500px',
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


class Entity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entityId: props.match.params.id,
        };
    }

    componentDidMount() {
        // This method is called when the component is first added to the document
        this.loadEntity(this.state.entityId);
    }

    componentDidUpdate() {
        const entityId = this.props.match.params.id;
        if (this.state.entityId !== entityId) {
            this.setState({
                entityId: entityId,
            });

            this.loadEntity(entityId);
        }
    }
    loadEntity(id) {
        if (id) this.props.fetchFiles(id);
        this.props.fetchEntity(id);
    }

    render() {
        const { handleSubmit, onAddEntity, onUpdateEntity, classes, entity } = this.props;
        const { entityId } = this.state;

        const isNew = !entityId;
        return (
            <div className={classes.paper}>
                {!isNew && <File entityId={entityId} />}
                {!isNew && <div><span className={classes.span}>{entityId}</span>{entity && <span className={classes.span}>{entity.creationTime}</span>}</div>}

                <Field component={renderTextField} name="code" label="Код"
                    autoComplete="code"/* autoFocus*/
                />

                <Field component={renderTextField} name="name" label="Название"
                    autoComplete="name"/* autoFocus*/
                />

                <Field component={renderTextField} name="description" label="Описание"
                    multiline autoComplete="description" rows={10}
                />

                <Field component={renderTextField} name="order" label="порядковый номер"
                    autoComplete="order"/* autoFocus*/
                />

                <Field component={renderCheckbox} name="hidden" label="Спрятать" />

                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.addEntityButton}
                    onClick={handleSubmit(data => { if (isNew) onAddEntity(data); else onUpdateEntity(data); })}
                >
                    {isNew && 'Добавить сущность'}
                    {!isNew && 'Обновить сущность'}
                </Button>


                {!isNew && <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.addEntityButton}
                    onClick={handleSubmit(data => { onAddEntity({parentIds: data.id ? [data.id] : undefined }, entityId); })}
                >
                    Добавить сущность
                </Button>}
            </div>
        )
    };
}

Entity = reduxForm({
    form: 'Entity', // a unique identifier for this form
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
    validate
})(Entity);


let mapState = (state) => {

    return {
        initialValues: {
            ...state.entities.currentEntity,
            //hidden: state.entities.currentEntity ? !!state.entities.currentEntity.hidden : false,
        },
        //isNew: !state.entities.currentEntity,
        entity: state.entities.currentEntity,
    };
};

let mapDispatch = (dispatch) => {
    return {
        onAddEntity: bindActionCreators(actionCreators.addEntityAndSelect, dispatch),
        onUpdateEntity: bindActionCreators(actionCreators.updateEntity, dispatch),
        fetchFiles: bindActionCreators(filesActionCreators.fetchFiles, dispatch),
        fetchEntity: bindActionCreators(actionCreators.fetchEntity, dispatch),
        //resetForm: bindActionCreators(reset, dispatch),
    };
};


const ConnectedEntity = connect(mapState, mapDispatch)(Entity);


const StyledEntity = (props) => {
    return <ConnectedEntity {...props} />;
}

export default withRouter(withStyles(styles)(StyledEntity));
