import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Entities';
import history from '../../../history';
import { withStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const styles = theme => ({
    action: {
        cursor: 'pointer',
    },
    table: {
        width: '100%',
    },
});


class Entities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entityId: props.match.params.id,
            parentIdToAdd: undefined,
        };
    }

    componentDidMount() {
        this.load(this.state.entityId);
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        const entityId = this.props.match.params.id;
        if (this.state.entityId !== entityId) {
            this.setState({
                ...this.state,
                entityId: entityId,
            });

            this.load(entityId);
        }
    }

    parentIdToAddChangeHandler = (e) => {
        this.setState({ ...this.state, parentIdToAdd: e.target.value });
    };

    load(id) {
        this.props.fetchEntities(id ? { parentIds: [id] } : {}, 'children');
        this.props.fetchEntities({ idsToFindParents: [id] }, 'parents');
    }


    render() {
        const { children, parents, deleteEntity, addParent, removeParent, classes } = this.props;
        const { entityId } = this.state;


        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>Идентификатор</th>
                                <th>Имя</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <TextField label="ИД родитиля для добавления" margin="none" fullWidth onChange={this.parentIdToAddChangeHandler} />
                                </td>
                                <td><Button type="button"
                                    variant="contained"
                                    color="primary" onClick={() => addParent({ id: entityId, parentId: this.state.parentIdToAdd })} className={classes.action}> <AddIcon /></Button></td>
                            </tr>
                            {(!parents || !parents[0]) && <tr><td colSpan="2">
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.addEntityButton}
                                    onClick={() => history.push(`/admin`)}
                                >
                                    На главную
                </Button>
                            </td></tr>}
                            {parents && parents.map(entity =>
                                <tr key={entity.id}>
                                    <td>
                                        <CopyToClipboard text={entity.id}><span className={classes.action} >{entity.id}</span></CopyToClipboard>
                                    </td>
                                    <td className={classes.action} onClick={() => history.push(`/admin/${entity.id}`)}>{entity.name}</td>
                                    <td><Button type="button"
                                        variant="contained"
                                        color="primary" onClick={() => removeParent({ id: entityId, parentId: entity.id })} className={classes.action}><DeleteIcon /></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>Идентификатор</th>
                                <th>Имя</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!children && <tr><td colSpan="2">Загружается...</td></tr>}
                            {children && children.map(entity =>
                                <tr key={entity.id} >
                                    <td>
                                        <CopyToClipboard text={entity.id}><span className={classes.action} >{entity.id}</span></CopyToClipboard>
                                    </td>
                                    <td className={classes.action} onClick={() => history.push(`/admin/${entity.id}`)}>{entity.name}</td>
                                    <td><Button type="button"
                                        variant="contained"
                                        color="primary" onClick={() => deleteEntity({ id: entity.id }, entityId)} className={classes.action}><DeleteIcon /></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Grid>
            </Grid>

        )
    };
}

let mapState = (state) => {
    return {
        children: state.entities.children,
        parents: state.entities.parents,
        //entityId: state.entities.currentEntity ? state.entities.currentEntity.id : undefined,
    };
};

let mapDispatch = (dispatch) => {
    return {
        fetchEntities: bindActionCreators(actionCreators.fetchEntities, dispatch),
        //selectEntity: bindActionCreators(actionCreators.selectEntity, dispatch),
        deleteEntity: bindActionCreators(actionCreators.deleteEntity, dispatch),
        removeParent: bindActionCreators(actionCreators.removeParent, dispatch),
        addParent: bindActionCreators(actionCreators.addParent, dispatch),
    };
};


const ConnectedEntities = connect(mapState, mapDispatch)(Entities);


const StyledEntities = (props) => {
    return <ConnectedEntities {...props} />;
}

export default withRouter(withStyles(styles)(StyledEntities));
