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
        this.state = {
        };
        this.categoryStorageValue = `categories${this.props.categoryId ? this.props.categoryId : ''}`;
    }

    componentDidMount() {
        // This method is called when the component is first added to the document
        if (!this.props.entities[this.categoryStorageValue])
            this.props.fetchEntities({ parentIds: [this.props.categoryId ? this.props.categoryId : '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0001-000000000003'] }, this.categoryStorageValue, true);
    }

    render() {
        const { entities, level, classes, theme } = this.props;
        const categories = entities ? entities[this.categoryStorageValue] : undefined;
        return (
            <Fragment>
                {categories &&
                    categories.map((entity, index) => {
                        let childCategoryStorageValue = `categories${entity.id}`;

                        if (!entities[childCategoryStorageValue])
                            this.props.fetchEntities({ parentIds: [entity.id, '00000000-0000-0000-0001-000000000003'] }, childCategoryStorageValue, true);
                        return (
                            <Fragment key={entity.id}>

                                <div>
                                    <RouterLink to={`category/${entity.id}`}>
                                        {entity.description ? entity.description : entity.name}
                                    </RouterLink>
                                </div>

                                <CategoriesPage categoryId={entity.id} level={level + 1} />
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
