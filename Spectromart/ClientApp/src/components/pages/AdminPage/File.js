import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/Files';
import fileService from '../../../services/filesService';

import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


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
        height: '50px',
    },
    imageContainer: {
        display: 'inline-block',
    },

});


class File extends Component {

    componentDidMount() {
        // This method is called when the component is first added to the document
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        // this.props.fetchLocations();

    }
    handleClick = (e) => {
        this.inputElement.click();
    }




    render() {
        const { classes, onChange, entityId, files, onDelete } = this.props;


        return (

            <Fragment>
                <div>
                    {!files && 'Загружается...'}
                    {files && files.map((file, index) =>
                        <div className={classes.imageContainer}>
                            <img key={file.id} src={fileService.getFileUrl(file.id)} alt={'image' + index} className={classes.image} /><br />
                            <Button
                                onClick={() => onDelete(file.id, entityId)}
                                variant="contained"
                                fullWidth={false}
                                color="primary" >
                                <DeleteIcon />
                            </Button>
                        </div>
                    )}
                </div>

                <input
                    ref={input => this.inputElement = input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(e) => onChange(e.target.files[0], entityId)}
                />
                <Button
                    onClick={this.handleClick}
                    variant="contained"
                    fullWidth={false}
                    color="primary" >
                    Загрузить
                </Button>
            </Fragment>
        )
    };
}

let mapState = (state) => {

    return {
        files: state.files.files,
    };
};

let mapDispatch = (dispatch) => {
    return {
        onChange: bindActionCreators(actionCreators.addFile, dispatch),
        onDelete: bindActionCreators(actionCreators.deleteFile, dispatch),
    };
};


export default connect(mapState, mapDispatch)(withStyles(styles)(File));

