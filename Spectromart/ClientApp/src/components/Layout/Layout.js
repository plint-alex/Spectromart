import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import LogoImage from './images/logo.jpg';
import LeftMenuButton from './LeftMenuButton';
import WaitDialog from './WaitDialog';
import CallUsDialog from './CallUsDialog';
import Notifier from './Notifier';
import LeftMenu from '../Layout/LeftMenu';

import { withStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    footerRoot: {
        display: 'flex',
        flexDirection: 'column',
    },
    headerHeight: {
        height: theme.mixins.toolbar.minHeight + theme.spacing(6),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            zIndex: theme.zIndex.drawer + 1,
        },
    },
    logo: {
        marginTop: theme.spacing(1),
        height: theme.mixins.toolbar.minHeight - theme.spacing(2),
        marginRight: theme.spacing(10),
    },
    content: {
        //flexGrow: 1,
        padding: theme.spacing(3),
        width: '100%',
    },
    toolbar1: theme.mixins.toolbar,
    toolbar2: {
        minHeight: theme.spacing(6),
        backgroundColor: theme.palette.secondary.main,
        color: '#FFFFFF',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar2Item: {
        paddingRight: '20px',
        [theme.breakpoints.up('md')]: {
            paddingRight: '70px',
        },
        marginRight: theme.spacing(2),
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 155,
            '&:focus': {
                width: 200,
            },
        },
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor: 'white',
        zIndex: 1201,
    },
    footerContainer: {
        //maxWidth: '100%',
        //marging: '0',
        //padding: '0',
    },
    textRight: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        }
    },
    textCenter: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'center',
        }
    },
    callUsButton: {

    },
}));

const Layout = (props) => {
    const classes = useStyles();

    const pathName = props.location.pathname;

    const [dialogOpen, setDialogOpen] = useState(false);

    //Если понадобится что-то передать в дочерние компоненты
    //const children = React.Children.map(props.children, child => {
    //    return React.cloneElement(child, {
    //        classes: classes
    //    });
    //});

    function getTabValue(pathName) {
        if (pathName.includes('admin')) {
            return false;
        }
        if (pathName.includes('category') || pathName.includes('categories') || pathName.includes('product')) {
            return '/catalog';
        }
        if (pathName.includes('news')) {
            return '/news';
        }

        return pathName;
    }

    return (
        <div>
            <div className={classes.root}>
                <WaitDialog />
                <Notifier />
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <LeftMenuButton />
                        <Typography variant="h6">
                            <Link to="/">
                                <img className={classes.logo} src={LogoImage} alt="Spectromart" />
                            </Link>
                        </Typography>
                        <Typography className={classes.title} noWrap>
                            Поставка, производство и сервис<br />аналитического и лабораторного оборудования
                    </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Поиск по каталогу …"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'Search' }}
                            />
                        </div>
                    </Toolbar>
                    <Toolbar className={classes.toolbar2}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            edge="start"
                            // onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Tabs indicatorColor="primary" value={getTabValue(pathName)} >
                            <Tab value={'/'} label="Главная" component={Link} to={'/'} />
                            <Tab value={'/about'} label="О компании" component={Link} to={'/about'} />
                            <Tab value={'/catalog'} label="Каталог" component={Link} to={'/catalog'} />
                            <Tab value={'/news'} label="Новости" component={Link} to={'/news'} />
                        </Tabs>
                    </Toolbar>
                </AppBar>

                {!pathName.includes('admin') && <LeftMenu />}
                <main className={classes.content}>
                    <div className={classes.headerHeight} />
                    <CssBaseline />
                    {props.children}
                </main>
            </div>
            <div className={classes.footerRoot}>
                <footer className={classes.footer}>
                    <Container className={classes.footerContainer}>
                        <Grid container >
                            <Grid item xs={12} sm={12} md={3}><Typography variant="body1">© ООО «Спектромарт»</Typography></Grid>
                            <Grid item xs={12} sm={12} md={2} className={classes.textCenter}><Typography variant="body1">8 383 312-01-37</Typography></Grid>
                            <Grid item xs={12} sm={12} md={2} className={classes.textCenter}><Typography variant="body1">8 913 707-85-37</Typography></Grid>
                            <Grid item xs={12} sm={12} md={3} className={classes.textCenter}><Typography variant="body1">info@spectromart.ru</Typography></Grid>
                            <Grid item xs={12} sm={12} md={2} className={classes.textRight}>

                                <Dialog
                                    fullWidth={true}
                                    minWidth={'md'}
                                    onClose={() => setDialogOpen(false)}
                                    open={dialogOpen}
                                    transitionDuration={{ enter: 1000, exit: 1000 }}
                                >
                                    <DialogTitle onClose={() => setDialogOpen(false)}>Закажите обратный звонок</DialogTitle>
                                    <DialogContent>
                                        <CallUsDialog closeDialog={() => setDialogOpen(false)}/>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.callUsButton}
                                    onClick={() => setDialogOpen(true)}
                                >
                                    Закажите звонок
                                </Button>

                            </Grid>
                        </Grid>
                    </Container>
                </footer>
            </div>
        </div>
    );
}


export default withRouter(Layout);