import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   
}));

const AboutPage = props => {

    const classes = useStyles();


    return (
        <div>
           about
        </div>
    )
};

export default connect()(AboutPage);
