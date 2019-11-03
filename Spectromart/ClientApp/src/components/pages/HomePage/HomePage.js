import React from 'react';
import { connect } from 'react-redux';
import NewsLine from '../NewsPage/NewsLine';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MainImage from '../images/main.jpg';

const useStyles = makeStyles(theme => ({
    mainImage: {
        height: theme.spacing(80),
        //width: '875px',
        //height: '699px',
        background: `url(${MainImage}) no-repeat center center`,
        backgroundSize: 'cover',
        borderBottom: '6px solid #285e95',
        textAlign: 'center',
    },
    mainText: {
        paddingTop: '335px',
        fontFamily: 'PTSansBold',
        fontSize: '34pt',
        textShadow: '#111 1px 2px 3px',
        color: 'white',
    }
}));

const HomePage = props => {

    const classes = useStyles();


    return (
        <div>
            <div className={classes.mainImage}>
                <div className={classes.mainText}>Мы созданы для решения Ваших задач</div>
            </div>
            <div>
                <NewsLine />
            </div>
        </div>
    )
};

export default connect()(HomePage);
