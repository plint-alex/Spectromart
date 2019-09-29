import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { actionCreators as layoutActions } from '../../store/Layout';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

const LeftMenuButton = props => {

    const classes = useStyles();

    return props.isLogedin ? (
        <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={props.toggleDrawer}
            className={classes.menuButton}
        >
            <MenuIcon />
        </IconButton>
    ) : ''
};


let mapDispatch = (dispatch) => {
    return {
        toggleDrawer: bindActionCreators(layoutActions.toggleDrawer, dispatch)
    };
};

export default connect(null, mapDispatch)(LeftMenuButton);