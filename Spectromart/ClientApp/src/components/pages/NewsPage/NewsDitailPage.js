import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/styles';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Entities';


const styles = theme => ({
   
});

class NewsDitailPageComponent extends Component {
    constructor(props) {
        super(props);
        const newNewsDitailId = props.match.params.id;
        this.state = {
            newsDitailId: newNewsDitailId,
        };
        this.newsDitailStorageValue = `newsDitail${newNewsDitailId}`;
    }

    componentDidMount() {
        // This method is called when the component is first added to the document

        this.loadNewsDitail(this.state.newsDitailId);
    }

    componentDidUpdate() {
        // This method is called when the component is first added to the document

        const newNewsDitailId = this.props.match.params.id;
        if (this.state.newsDitailId !== newNewsDitailId) {
            this.setState({
                newsDitailId: newNewsDitailId,
            });

            this.loadNewsDitail(newNewsDitailId);
        }
    }

    loadNewsDitail(newsDitailId) {
        const newsDitailStorageValue = `newsDitail${newsDitailId}`;

        this.newsDitailStorageValue = newsDitailStorageValue;

        if (!this.props.entities[newsDitailStorageValue])
            this.props.fetchEntities({ ids: [newsDitailId] }, newsDitailStorageValue, true);
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
        const {  classes, theme } = this.props;
        const currentNewsDitail = this.props.entities.entities ? this.props.entities.entities[this.state.newsDitailId] : undefined;
        return (
            <Fragment>
                {currentNewsDitail &&
                    <Fragment>
                        <div>
                            {currentNewsDitail.name}
                        </div>
                        <div>
                            {currentNewsDitail.description}
                        </div>
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

const ConnectedNewsDitailPage = connect(mapState, mapDispatch)(withWidth()(NewsDitailPageComponent));

const StyledNewsDitailPage = (props) => {
    return <ConnectedNewsDitailPage {...props} />;
}
const NewsDitailPage = withRouter(withStyles(styles)(StyledNewsDitailPage));
export default NewsDitailPage;
