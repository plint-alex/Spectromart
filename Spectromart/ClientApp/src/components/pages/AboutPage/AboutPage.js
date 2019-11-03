import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainImage from '../images/main.jpg';

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

const AboutPage = props => {

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <div className={classes.mainImage}>
                <h1 className={classes.mainText}>О компании</h1>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h3>
                        Компания ООО «СПЕКТРОМАРТ» является поставщиком современного отечественного и импортного лабораторного оборудования на рынке РФ для лабораторий в сфере добычи и переработки природных ресурсов, экологических лабораторий, лабораторий образовательных учреждений, коммерческих лабораторий.
                        </h3>    
                    </Paper>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Paper className={classes.paper}>
                        <h4>Мы поставляем и обслуживаем:</h4>
                        <ul>
                            <li>спектрометры</li>
                            <li>электронные микроскопы</li>
                            <li>хроматографы</li>
                            <li>реакторы для химического синтеза</li>
                            <li>рентгеновские спектрометры</li>
                            <li>приборы неразрушающего контроля</li>
                            <li>оборудование для пробоподготовки</li>
                            <li>оборудование для исследования материалов</li>
                            <li>оборудование для получения новых материалов</li>
                            <li>весовое оборудование</li>
                            <li>общелабораторное оборудование</li>
                            <li>расходные материалы</li>
                        </ul>
                        </Paper>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Paper className={classes.paper}>
                        <h4>Наши партнеры:</h4>
                        <ul>
                            <li>AgilentTechnologies</li>
                            <li>Olympus</li>
                            <li>Jeol</li>
                            <li>Leica</li>
                            <li>OHAUS</li>
                            <li>Vibra (Shinko)</li>
                            <li>Sartorius</li>
                            <li>AND</li>
                            <li>Люмахром</li>
                            <li>Люмекс</li>
                            <li>Хроматэк</li>
                            <li>GNR</li>
                        </ul>
                        </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h3>Компания ООО «СПЕКТРОМАРТ» предоставляет следующие услуги:</h3>
                        <ul>
                            <li>подбор лабораторного оборудования в соответствии с задачами пользователя</li>
                            <li>пуско-наладка лабораторного оборудования/калибровка</li>
                            <li>постановка метода выполнения измерений, помощь в подготовке документов к аккредитации или аттестации лаборатории</li>
                            <li>внесение в реестр</li>
                            <li>разработка и  изготовление оборудования под заказ</li>
                            <li>сервисное обслуживание аналитических приборов</li>
                            <li>комплексное оснащение лабораторий.</li>
                        </ul>
                        </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default connect()(AboutPage);
