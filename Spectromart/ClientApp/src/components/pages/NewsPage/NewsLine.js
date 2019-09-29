import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Entities';
import { withStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';


const styles = theme => ({
    
});

class NewsPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.newsStorageValue = `news${this.props.categoryId ? this.props.categoryId : ''}`;
    }

    componentDidMount() {
        // This method is called when the component is first added to the document
        if (!this.props.entities[this.newsStorageValue])
            this.props.fetchEntities({ parentIds: ['00000000-0000-0000-0000-000000000008'] }, this.newsStorageValue, true);
    }

    render() {
        const { entities, level, classes, theme } = this.props;
        const categories = entities ? entities[this.newsStorageValue] : undefined;
        return (
            <Fragment>
                {categories &&
                    categories.slice(0, 5).map((entity, index) => {                       
                        return (
                            <Fragment key={entity.id}>

                                <div>
                                    <RouterLink to={`news/${entity.id}`}>
                                        {entity.name}
                                    </RouterLink>
                                </div>
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

const ConnectedNewsPage = connect(mapState, mapDispatch)(NewsPageComponent);

const StyledNewsPage = (props) => {
    return <ConnectedNewsPage {...props} />;
}
const NewsPage = withStyles(styles)(StyledNewsPage);
export default NewsPage
