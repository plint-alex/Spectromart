import React, { Component, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Entities';
import { withStyles } from '@material-ui/styles';
import history from '../../history';

import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const styles = theme => ({
    
});

class LeftMenuListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: {},
        };
        this.categoryStorageValue = `categories${this.props.categoryId ? this.props.categoryId : ''}`;
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // This method is called when the component is first added to the document
        if (!this.props.entities[this.categoryStorageValue])
            this.props.fetchEntities({ parentIds: [this.props.categoryId ? this.props.categoryId : '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0001-000000000003'] }, this.categoryStorageValue, true);
    }

    handleClick(id) {
        let newState = { ...this.state };
        newState.isOpen[id] = !newState.isOpen[id];

        this.setState(newState);
    }

    handleListItemClick(id) {
        history.push(`/category/${id}`);
    }

    openChildren(id) {
        this.setState({ ...this.state, open: this.state.open });
    }

    render() {
        const { entities, level, classes, theme } = this.props;
        const categories = entities ? entities[this.categoryStorageValue] : undefined;
        return (
            <Fragment>
                {categories &&
                    <List key={this.categoryStorageValue}>
                        {categories.map((entity, index) => {
                            let childCategoryStorageValue = `categories${entity.id}`;
                            let hasChildren = entities && entities[childCategoryStorageValue] && entities[childCategoryStorageValue][0];

                            if (!entities[childCategoryStorageValue])
                                this.props.fetchEntities({ parentIds: [entity.id, '00000000-0000-0000-0001-000000000003'] }, childCategoryStorageValue, true);
                            return (
                                <Fragment key={entity.id}>
                                    <ListItem style={{paddingLeft: level*12}} button onClick={(e) => { this.handleListItemClick(entity.id); }}>
                                        <ListItemText primary={entity.name} />
                                        {hasChildren && (this.state.isOpen[entity.id] ?
                                            <ExpandLess onClick={(e) => { e.stopPropagation(); this.handleClick(entity.id); }} /> :
                                            <ExpandMore onClick={(e) => { e.stopPropagation(); this.handleClick(entity.id); }} />)}
                                    </ListItem>
                                    <Collapse in={this.state.isOpen[entity.id]} timeout="auto" unmountOnExit key={this.categoryStarageValue}>
                                        <LeftMenuList categoryId={entity.id} level={level + 1} />
                                    </Collapse>
                                </Fragment>
                            );
                        })}
                    </List>
                }
            </Fragment>
        );
    }
};

let mapState = (state) => {
    return {
        entities: state.entities,
    };
};

let mapDispatch = (dispatch) => {
    return {
        fetchEntities: bindActionCreators(actionCreators.fetchEntities, dispatch),
    };
};

const ConnectedLeftMenuList = connect(mapState, mapDispatch)(LeftMenuListComponent);

const StyledLeftMenuList = (props) => {
    return <ConnectedLeftMenuList {...props} />;
}
const LeftMenuList = withStyles(styles)(StyledLeftMenuList);
export default LeftMenuList
