import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Entities from './Entities';

import { withStyles } from '@material-ui/styles';


const styles = theme => ({

});


class EntitiesPage extends Component {

    componentDidMount() {
        // This method is called when the component is first added to the document
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        // this.props.fetchLocations();
    }


    render() {

        return (
            <Fragment>
                <Entities />
            </Fragment>
        )
    };
}

let mapState = (state) => {
    return {
    };
};

let mapDispatch = (dispatch) => {
    return {
    };
};


const ConnectedEntitiesPage = connect(mapState, mapDispatch)(EntitiesPage);


const StyledEntitiesPage = (props) => {
    const { classes } = props;
    return <ConnectedEntitiesPage classes={classes} />;
}

export default withStyles(styles)(StyledEntitiesPage);
