import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import LeftMenuList from './LeftMenuList';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerTopSpace: {
        ...theme.mixins.toolbar,
        [theme.breakpoints.up('sm')]: {
            minHeight: 0
        }
    },
    drawerPaper: {
        width: drawerWidth,
        height: 'auto',
        bottom: '0',
        [theme.breakpoints.up('sm')]: {
            top: theme.mixins.toolbar.minHeight + theme.spacing(6)
        }
    },
});

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    componentDidMount() {
        // This method is called when the component is first added to the document
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    render() {
        const { container, classes, theme} = this.props;

        const drawer = (props) => {
            return (
                <div>
                    <div className={classes.drawerTopSpace} />
                    <Divider />
                    <LeftMenuList level={1}/>
                </div>
            )
        };

        return (
            <nav key="nav" className={classes.drawer} aria-label="Mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="js">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor="left"
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer(this.props)}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="js">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer(this.props)}
                    </Drawer>
                </Hidden>
            </nav>
        );
    }
};



export default withStyles(styles)(LeftMenu);
