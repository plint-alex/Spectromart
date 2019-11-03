import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Switch } from 'react-router';
import Layout from './components/Layout/Layout';
import MainLayout from './components/MainLayout/MainLayout';
import HomePage from './components/pages/HomePage/HomePage';
import AdminPage from './components/pages/AdminPage/AdminPage';
import AboutPage from './components/pages/AboutPage/AboutPage';
import ServicePage from './components/pages/ServicePage/ServicePage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import ProductPage from './components/pages/EntitiesPage/ProductPage';
import CategoriesPage from './components/pages/EntitiesPage/CategoriesPage';
import NewsPage from './components/pages/NewsPage/NewsPage';
import NewsDitailPage from './components/pages/NewsPage/NewsDitailPage';
import CategoryPage from './components/pages/EntitiesPage/CategoryPage';
import { PrivateRoute } from './components/PrivateRoute';
import { Route, Redirect } from 'react-router';

//import black from '@material-ui/core/colors/black';

const theme = createMuiTheme({
    mixins: {
        toolbar: {
            minHeight: 75,
            '@media (min-width:0px) and (orientation: landscape)': {
                minHeight: 75,
            },
            '@media (min-width:600px)': {
                minHeight: 75,
            },
        },
    },
    palette: {
        //type: 'dark',
        primary: { main: '#FFFFFF' },
        secondary: { main: '#328BCB' },
    },
    typography: {
        fontFamily: [
            'PTSansRegular',
        ].join(','),
    }, 
});

export default () => {
    return (<ThemeProvider theme={theme}>
        <SnackbarProvider preventDuplicate={false}>
            <Switch>
                <Route path="/seo" render={props => {
                    const asdf = props.location;
                    return <Redirect to={{ pathname: props.location.pathname.replace('/seo', ''), state: { from: props.location } }} />;
                }} />
                <Layout>
                    <MainLayout>
                        <PrivateRoute exact path="/admin" component={AdminPage} />
                        <PrivateRoute exact path="/admin/:id" component={AdminPage} />
                    </MainLayout>
                    <PrivateRoute exact path="/login" component={LoginPage} />
                    <PrivateRoute path="/product/:id" component={ProductPage} />
                    <PrivateRoute path="/category/:id" component={CategoryPage} level={1} />
                    <PrivateRoute exact path="/catalog" component={CategoriesPage} />
                    <PrivateRoute exact path="/news" component={NewsPage} />
                    <PrivateRoute exact path="/news/:id" component={NewsDitailPage} />
                    <PrivateRoute exact path="/about" component={AboutPage} />
                    <PrivateRoute exact path="/service" component={ServicePage} />
                    <PrivateRoute exact path="/" component={HomePage} />
                </Layout>
            </Switch >
        </SnackbarProvider>
    </ThemeProvider>);
};
