import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Files';
import fileService from '../../../services/filesService';

import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
    image: {
        height: '150px',
    },

});


class ProductMainImage extends Component {

    componentDidMount() {

        if (this.props.entityId && (!this.props.files.files || !this.props.files.files[this.props.entityId])) {
            this.props.fetchFiles(this.props.entityId, true);

        }
        // This method is called when the component is first added to the document
    }

    componentDidUpdate() {

    }




    render() {
        const { classes, onChange, entityId, files, alt, height, width } = this.props;


        return (

            <Fragment>
                {files.filesCache && files.filesCache[entityId] && files.filesCache[entityId].map((file, index) =>
                    <img key={file.id} src={fileService.getFileUrl(file.id)} alt={alt} className={classes.image} style={{ height: height ? height : (width ? 'auto' : undefined), width: width }} />
                )}
            </Fragment>
        )
    };
}

let mapState = (state) => {

    return {
        files: state.files,
    };
};

let mapDispatch = (dispatch) => {
    return {
        fetchFiles: bindActionCreators(actionCreators.fetchFiles, dispatch),
    };
};


const ConnectedProductMainImage = connect(mapState, mapDispatch)(ProductMainImage);

const StyledProductMainImage = (props) => {
    return <ConnectedProductMainImage {...props} />;
}
export default withStyles(styles)(StyledProductMainImage);

