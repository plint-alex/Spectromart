import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Entities';
import { withStyles } from '@material-ui/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({

});


class Entities extends Component {

    componentDidMount() {
        // This method is called when the component is first added to the document
        //if (!this.props.entities)
        //    this.props.fetchEntities();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        // this.props.fetchLocations();
    }


    render() {
        const { entities, classes } = this.props;
        const props = this.props;
        const getGridListCols = () => {
            if (isWidthUp('xl', props.width)) {
                return 6;
            }

            if (isWidthUp('lg', props.width)) {
                return 5;
            }

            if (isWidthUp('md', props.width)) {
                return 4;
            }

            if (isWidthUp('sm', props.width)) {
                return 3;
            }

            if (isWidthUp('xs', props.width)) {
                return 2;
            }

            return 1;
        }


        return (
            <Fragment>
                {!entities && <tr><td colSpan="3">Загружается...</td></tr>}
                {entities &&
                    <GridList spacing={15} cellHeight={180} cols={getGridListCols()}>
                        {entities.map(entity =>
                            <GridListTile key={entity.id}>
                                <img src={entity.mainImage} alt={entity.name} />
                                <GridListTileBar
                                    title={entity.name}
                                />
                            </GridListTile>
                        )}
                    </GridList>}
            </Fragment>
        )
    };
}

let mapState = (state) => {
    return {
        children: state.entities.children,
        parents: state.entities.parents,
    };
};

let mapDispatch = (dispatch) => {
    return {
        fetchEntities: bindActionCreators(actionCreators.fetchEntities, dispatch),
    };
};


const ConnectedEntities = connect(mapState, mapDispatch)(withWidth()(Entities));


const StyledEntities = (props) => {
    const { classes } = props;
    return <ConnectedEntities classes={classes} />;
}

export default withStyles(styles)(StyledEntities);
