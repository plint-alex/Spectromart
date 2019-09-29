import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Entities';
import CallUsDialog from '../../Layout/CallUsDialog';
import ProductMainImage from './ProductMainImage';
import { withRouter } from "react-router";
import { Link as RouterLink } from 'react-router-dom';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/styles';

import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const styles = theme => ({
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    subtitle: {
        color: theme.palette.primary.light,
        whiteSpace: 'normal',
    },
    samples: {
        display: 'table-cell',
        verticalAlign: 'middle',
        borderCollapse: 'collapse',
        paddingTop: '2px',
        width: '150px',
    },
    options: {
        display: 'table-cell',
        verticalAlign: 'middle',
        borderCollapse: 'collapse',
        paddingTop: '2px',
        width: '150px',
    },
    option: {
        height: '150px',
        position: 'relative',
        display: 'block',
        verticalAlign: 'middle',
        borderCollapse: 'collapse',
        //height: '120xp',
    },
    option_goods: {
        display: 'table-cell',
        verticalAlign: 'middle',
        //width:330px;
        //width: '190px',
    },
    o_int: {
        //height: '120px',
        maxWidth: '200px'
    },
    h_line: {
        position: 'absolute',
        top: '66px',
        width: '40px',
        textAlign: 'center'
    },
    h_line_sample: {
        paddingTop: '1px',
        width: '40px',
        display: 'table-cell',
        verticalAlign: 'middle',
        borderCollapse: 'collapse',
        textAlign: 'center'
    },
    h_line_annex: {
        paddingTop: '1px',
        width: '40px',
        display: 'table-cell',
        verticalAlign: 'middle',
        borderCollapse: 'collapse',
        textAlign: 'center'
    },
    v_line: {
        width: '3px',
        display: 'table-cell',
        verticalAlign: 'middle',
        borderCollapse: 'collapse'
    },
    pro_line: {
        width: '3px',
        background: '#ccc'
    },
    option_line: {
        width: '3px',
        background: '#ccc',
    },
    g_hr: {
        border: 'none',
        color: '#ccc',
        backgroundColor: '#ccc',
        height: '3px',
        //margin: '10px 0px 10px 0px',
        width: '40px'
    },
    desc_2: {
        color: 'gray',
        textAlign: 'center',
        marginLeft: '19px'
    },
    "pro_name": {
        "display": "table-cell",
        "verticalAlign": "middle",
        "fontFamily": "'PTSansRegular'",
        "color": "black",
        "//display": "none",
        "maxWidth": "150px",
        "textAlign": "right"
    },
    "desc_1": {
        "color": "gray",
        "textAlign": "center",
        //"marginLeft": "-27px"
    },
    "desc_2": {
        "color": "gray",
        "textAlign": "center",
        //"marginLeft": "19px"
    },
    "main_img": {
        "//width": "500px",
        "width": "335px",
        "display": "table-cell",
        "verticalAlign": "middle",
        "textAlign": "center"
    },
    "checkbox_sample": {
        "position": "absolute",
        //"margin": "-21px 0px 0px -10px",
        "width": "20px",
        "height": "20px",
        "border": "none",
        top: '-4px',
        left: '4px',
    },
    "checkbox_annex": {
        "position": "absolute",
        //"margin": "-21px 0px 0px -10px",
        "width": "20px",
        "height": "20px",
        "border": "none",
        top: '-4px',
        left: '4px',
    },
    "hover_u": {
        "color": "black",
        "textDecoration": "none"
    },
    "hover_u_hover": {
        "textDecoration": "underline"
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value != index}
            id={`wrapped-tabpanel-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

class ProductPageComponent extends Component {
    constructor(props) {
        super(props);
        const productId = props.match.params.id;
        this.state = {
            productId: productId,
            tabValue: 0,
        };
        this.productsStorageValue = `product${productId}`;
    }

    componentDidMount() {
        // This method is called when the component is first added to the document

        this.loadProduct(this.state.productId);
    }

    componentDidUpdate() {
        const productId = this.props.match.params.id;
        this.productsStorageValue = `product${productId}`;
        if (this.state.productId !== productId) {
            this.setState({
                ...this.setState,
                productId: productId,
            });

            this.loadProduct(productId);
        }
    }

    loadProduct(productId) {
        const productsStorageValue = `product${productId}`;

        if (!this.props.entities[productsStorageValue])
            this.props.fetchEntities({ ids: [productId, '00000000-0000-0000-0001-000000000004'] }, productsStorageValue, true);
        this.props.fetchEntities({ parentIds: [productId, '00000000-0000-0000-0000-000000000007'] }, productsStorageValue + 'Characteristic', true);
        this.props.fetchEntities({ parentIds: [productId, '00000000-0000-0000-0000-000000000005'] }, productsStorageValue + 'ProductSamplePreparation', true);
        this.props.fetchEntities({ parentIds: [productId, '00000000-0000-0000-0000-000000000006'] }, productsStorageValue + 'ProductConsole', true);
    }

    handleChange = (event, newValue) => {
        this.setState({
            ...this.setState,
            tabValue: newValue,
        });
    };

    render() {
        const { entities, level, classes, theme } = this.props;
        const currentProduct = this.props.entities.entities ? this.props.entities.entities[this.state.productId] : undefined;
        const currentCharacteristic = entities ? entities[this.productsStorageValue + 'Characteristic'] : undefined;
        const currentProductSamplePreparations = entities ? entities[this.productsStorageValue + 'ProductSamplePreparation'] : undefined;
        const currentProductConsoles = entities ? entities[this.productsStorageValue + 'ProductConsole'] : undefined;
        return (
            <Fragment>
                {currentProduct &&
                    <Fragment>
                        <div>{currentProduct.name}</div>
                        <center >

                            {((currentProductSamplePreparations && currentProductSamplePreparations[0]) || (currentProductConsoles && currentProductConsoles[0])) &&
                                <div style={{ backgroundColor: 'white' }}>
                                    {currentProductSamplePreparations && currentProductSamplePreparations[0] &&
                                        <div className={classes.samples}>
                                            <div className={classes.desc_1}>Пробоподготовка<br />↓</div>
                                        </div>
                                    }
                                    <div className={classes.main_img}>Нажимая на галочки, выберите<br />компоненты, необходимые для Вашей организации</div>
                                    {(currentProductConsoles && currentProductConsoles[0]) &&
                                        <div className={classes.options}>
                                            <div className={classes.desc_2}>Приставки<br />↓</div>
                                        </div>
                                    }
                                </div>
                            }

                            <div style={{ backgroundColor: 'white' }}>
                                <div className={classes.samples}>
                                    {currentProductSamplePreparations && currentProductSamplePreparations.map((entity, index) => {
                                        return (
                                            <div key={entity.id} className={classes.option} style={{ paddingRight: '40px' }}>
                                                <div className={classes.option_goods}>
                                                    <Link component={RouterLink} className={classes.hover_u} color="inherit" to={`/product/${entity.id}`}>
                                                        <ProductMainImage entityId={entity.id} className={classes.o_int} alt={entity.name} title={entity.name} />
                                                    </Link>
                                                </div>
                                                <div className={classes.h_line} style={{ right: '0px' }}><hr className={classes.g_hr} /><input className={classes.checkbox_sample} type="checkbox" /></div>
                                            </div>
                                        );
                                    })}

                                </div>

                                <div className={classes.v_line}><div className={classes.pro_line} style={{ height: (!currentProductSamplePreparations || currentProductSamplePreparations.length == 1) ? '3px' : (((currentProductSamplePreparations.length - 1) * 150) + 4) + 'px' }}></div></div>
                                {currentProductSamplePreparations && currentProductSamplePreparations[0] && <div className={classes.h_line_sample}><div className={classes.g_hr} ></div></div>}
                                <div className={classes.main_img}>
                                    <ProductMainImage entityId={currentProduct.id} alt={currentProduct.name} title={currentProduct.name} width="335px" />
                                </div>
                                {currentProductConsoles && currentProductConsoles[0] && <div className={classes.h_line_annex}><div className={classes.g_hr} ></div></div>}
                                <div className={classes.v_line}><div className={classes.option_line} style={{ height: (!currentProductConsoles || currentProductConsoles.length == 1) ? '3px' : (((currentProductConsoles.length - 1) * 150) + 4) + 'px' }}></div></div>

                                <div className={classes.options}>
                                    {currentProductConsoles && currentProductConsoles.map((entity, index) => {
                                        return (
                                            <div key={entity.id} className={classes.option} style={{ paddingLeft: '40px' }}>
                                                <div className={classes.h_line} style={{ left: '0px' }}><hr className={classes.g_hr} />
                                                    <input className={classes.checkbox_annex} type="checkbox" /></div>
                                                <div className={classes.option_goods}>
                                                    <Link component={RouterLink} className={classes.hover_u} color="inherit" to={`/product/${entity.id}`}>
                                                        <ProductMainImage entityId={entity.id} className={classes.o_int} alt={entity.name} title={entity.name} />
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>

                            </div>

                            <CallUsDialog className={classes.callUsDialog} entityId={currentProduct.id} />

                        </center>
                        <Tabs
                            value={this.state.tabValue}
                            indicatorColor="secondary"
                            textColor="secondary"
                            onChange={this.handleChange}
                        >
                            <Tab label="Описание" />
                            <Tab label="Характеристики" />
                        </Tabs>
                        <TabPanel value={this.state.tabValue} index="0">
                            <div dangerouslySetInnerHTML={{ __html: currentProduct && currentProduct.description }} />
                        </TabPanel>
                        <TabPanel value={this.state.tabValue} index="1" >
                            <div dangerouslySetInnerHTML={{ __html: currentCharacteristic && currentCharacteristic[0] && currentCharacteristic[0].description }} />
                        </TabPanel>

                    </Fragment>
                }
            </Fragment>
        );
    }
};

let mapState = (state) => {
    return {
        entities: state.entities,
    };
};

let mapDispatch = (dispatch) => {
    return {
        fetchEntities: bindActionCreators(actionCreators.fetchEntities, dispatch),
    };
};

const ConnectedProductPage = connect(mapState, mapDispatch)(withWidth()(ProductPageComponent));

const StyledProductPage = (props) => {
    return <ConnectedProductPage {...props} />;
}
const ProductPage = withRouter(withStyles(styles)(StyledProductPage));
export default ProductPage;
