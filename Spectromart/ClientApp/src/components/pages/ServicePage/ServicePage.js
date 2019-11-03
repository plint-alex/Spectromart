import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainImage from '../images/main.jpg';
import CallUsDialog from '../../Layout/CallUsDialog';
import CallUsDialogService from '../../Layout/CallUsDialogService';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        //fontSize: 12,
    },
    mainImage: {
        height: theme.spacing(40),
        //width: '875px',
        //height: '699px',
        background: `url(${MainImage}) no-repeat center center`,
        backgroundSize: 'cover',
        borderBottom: '6px solid #285e95',
        textAlign: 'center',
    },
    mainText: {
        paddingTop: '135px',
        fontFamily: 'PTSansBold',
        fontSize: '34pt',
        textShadow: '#111 1px 2px 3px',
        color: 'white',
    }
}));

const ServicePage = props => {

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <div className={classes.mainImage}>
                <h1 className={classes.mainText}>Сервисная служба компании ООО «Спектромарт»</h1>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h3>
                            Содержит штат высококвалифированных специалистов инженеров-электронщиков со знанием физико-химических наук. Специалисты обладают многолетним опытом работы в этой сфере.
                        </h3>
                    </Paper>
                </Grid>
                <Grid item sm={12} md={4}>
                    <Paper className={classes.paper}>
                        <h4>Наше сервисное подраздерелие предлагает услуги:</h4>
                        <ul>
                            <li>Ремонт и облслуживание/калибровка аналитического оборудования</li>
                            <li>гарантийное обслуживание в соответствии с требованиями завода-изготовителя</li>
                            <li>пуско-наладочные работы аналитического оборудования</li>
                            <li>ремонт вышедших из строя модулей-блоков</li>
                            <li>поставка оригинальных запчастей</li>
                            
                        </ul>
                    </Paper>
                </Grid>
                <Grid item sm={12} md={8}>
                    <Paper className={classes.paper}>
                        <h4>Для оперативного реагирования сервисного отдела заполните форму ниже, и наши специалисты в ближайшее время свяжутся с вами. </h4>
                        
                        <CallUsDialogService/>
                        
                    </Paper>
                </Grid>
                
            </Grid>
        </div>
    )
};

export default connect()(ServicePage);
