import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Entities';
import { withStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const drawerWidth = 240;

const styles = theme => ({
    
});

class CategoriesPageComponent extends Component {
    constructor(props) {
        super(props);
        const newCategoryId = props.categoryId ? props.categoryId : undefined;
        this.state = {
            categoryId: newCategoryId,
        };
        this.categoryStorageValue = `categories${newCategoryId}`;
    }

    componentDidMount() {
        // This method is called when the component is first added to the document

        this.loadCategory(this.state.categoryId);
    }
    componentDidUpdate() {
        // This method is called when the component is first added to the document

        const newCategoryId = this.props.categoryId ? this.props.categoryId : undefined;
        if (this.state.categoryId !== newCategoryId) {
            this.setState({
                categoryId: newCategoryId,
            });

            this.loadCategory(newCategoryId);
        }
    }

    loadCategory(categoryId) {
        const categoryStorageValue = `categories${categoryId}`;

        this.categoryStorageValue = categoryStorageValue;

        let parentIds = ['00000000-0000-0000-0001-000000000003'];
        if (categoryId) parentIds.push(categoryId);

        if (!this.props.entities[categoryStorageValue])
            this.props.fetchEntities({ parentIds: parentIds }, categoryStorageValue, true);
    }

    render() {
        const { entities, level = 1, classes, theme } = this.props;
        const categories = entities ? entities[this.categoryStorageValue] : undefined;
        return (
            <Fragment>
                {categories &&
                    categories.map((entity, index) => {
                        let childCategoryStorageValue = `categories${entity.id}`;

                        return (
                            <Fragment key={entity.id}>

                                <div style={{ paddingLeft: level * 12 }}  >
                                    <RouterLink to={`category/${entity.id}`}>
                                        {entity.description ? entity.description : entity.name}
                                    </RouterLink>
                                </div>

                                {entity && entity.id && <CategoriesPage categoryId={entity.id} level={level + 1} />}
                            </Fragment>
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

const ConnectedCategoriesPage = connect(mapState, mapDispatch)(CategoriesPageComponent);

const StyledCategoriesPage = (props) => {
    return <ConnectedCategoriesPage {...props} />;
}
const CategoriesPage = withStyles(styles)(StyledCategoriesPage);
export default CategoriesPage
