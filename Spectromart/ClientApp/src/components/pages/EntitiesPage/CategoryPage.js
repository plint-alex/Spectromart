import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Entities';
import ProductMainImage from './ProductMainImage';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter } from "react-router";
import history from '../../../history';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/styles';

import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';


const styles = theme => ({    
    GridListTile: {
        cursor: 'pointer',
        backgroundColor: 'white',
        textAlign: 'center',
    },
});

class CategoryPageComponent extends Component {
    constructor(props) {
        super(props);
        const newCategoryId = props.categoryId ? props.categoryId : props.match.params.id;
        this.state = {
            categoryId: newCategoryId,
        };
        this.categoryStorageValue = `categories${newCategoryId}`;
        this.productsStorageValue = `products${newCategoryId}`;
    }

    componentDidMount() {
        // This method is called when the component is first added to the document

        this.loadCategory(this.state.categoryId);
    }

    componentDidUpdate() {
        // This method is called when the component is first added to the document

        const newCategoryId = this.props.categoryId ? this.props.categoryId : this.props.match.params.id;
        if (this.state.categoryId !== newCategoryId) {
            this.setState({
                categoryId: newCategoryId,
            });

            this.loadCategory(newCategoryId);
        }
    }

    loadCategory(categoryId) {
        const categoryStorageValue = `categories${categoryId}`;
        const productsStorageValue = `products${categoryId}`;

        this.categoryStorageValue = categoryStorageValue;
        this.productsStorageValue = productsStorageValue;

        if (!this.props.entities.entities || !this.props.entities.entities[categoryId])
            this.props.fetchEntities({ ids: [categoryId, '00000000-0000-0000-0001-000000000003'] }, 'tmp', true);

        if (!this.props.entities[categoryStorageValue])
            this.props.fetchEntities({ parentIds: [categoryId, '00000000-0000-0000-0001-000000000003'] }, categoryStorageValue, true);

        if (!this.props.entities[productsStorageValue])
            this.props.fetchEntities({ parentIds: [categoryId, '00000000-0000-0000-0001-000000000004'] }, productsStorageValue, true);
    }

    getGridListCols = (props) => {
        if (isWidthUp('xl', props.width)) {
            return 6;
        }

        if (isWidthUp('lg', props.width)) {
            return 5;
        }

        if (isWidthUp('md', props.width)) {
            return 3;
        }

        if (isWidthUp('sm', props.width) && props.width < 300) {
            return 1;
        }

        if (isWidthUp('sm', props.width)) {
            return 2;
        }

        if (isWidthUp('xs', props.width)) {
            return 2;
        }

        return 1;
    }

    render() {
        const { entities, level, classes, theme } = this.props;
        const categories = entities ? entities[this.categoryStorageValue] : undefined;
        const products = entities ? entities[this.productsStorageValue] : undefined;
        const currentCategory = this.props.entities.entities ? this.props.entities.entities[this.state.categoryId] : undefined;
        return (
            <Fragment>
                {currentCategory &&
                    <GridList spacing={10} cellHeight={180} cols={this.getGridListCols(this.props)}>
                        <GridListTile cols={this.getGridListCols(this.props)} style={{ height: 'auto' }}>
                        {(level && level > 1) &&
                            <Link component={RouterLink} color="inherit" to={`/category/${currentCategory.id}`}>
                                    <ListSubheader component="div">{currentCategory.description ? currentCategory.description : currentCategory.name}</ListSubheader>
                                </Link>}
                            {(!level || level === 1) &&
                                <ListSubheader component="div">{currentCategory.description ? currentCategory.description : currentCategory.name}</ListSubheader>}
                        </GridListTile>
                        {products && products.map((entity, index) => {
                            return (
                                <GridListTile key={entity.id} onClick={() => { history.push(`/product/${entity.id}`); }} className={classes.GridListTile}>
                                    <ProductMainImage entityId={entity.id} alt={entity.name} />
                                    <GridListTileBar
                                        subtitle={entity.name}
                                        classes={{
                                            root: classes.titleBar,
                                            subtitle: classes.subtitle,
                                        }}
                                    />
                                </GridListTile>
                            );
                        })}
                    </GridList>
                }

                {categories &&
                    categories.map((entity, index) => {
                        let childCategoryStorageValue = `categories${entity.id}`;

                        if (!entities[childCategoryStorageValue])
                            this.props.fetchEntities({ parentIds: [entity.id, '00000000-0000-0000-0001-000000000003'] }, childCategoryStorageValue, true);
                        return (
                            <CategoryPage key={entity.id} categoryId={entity.id} categoryParentId={this.state.categoryId} level={level === undefined ? 2 : level + 1} />
                        );
                    })
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

const ConnectedCategoryPage = connect(mapState, mapDispatch)(withWidth()(CategoryPageComponent));

const StyledCategoryPage = (props) => {
    return <ConnectedCategoryPage {...props} />;
}
const CategoryPage = withRouter(withStyles(styles)(StyledCategoryPage));
export default CategoryPage;
