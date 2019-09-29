import filesService from '../services/filesService';

const uploadFileSuccessType = 'UPLOAD_FILE_SUCCESS';
const uploadFileStartType = 'UPLOAD_FILE_START';
const uploadFileProgressType = 'UPLOAD_FILE_PROGRESS';
const getFilesSuccessType = 'GET_FILES_SUCCESS';


const initialState = {};

export const actionCreators = {
    addFile: (file, entityId) => {
        let uploadFileStart = () => { return { type: uploadFileStartType }; };
        let getFilesSuccess = (files) => { return { type: getFilesSuccessType, files }; };
        let uploadFileProgress = (e) => { return { type: uploadFileProgressType, e }; };
        let uploadFileSuccess = () => { return { type: uploadFileSuccessType }; };

        return async dispatch => {
            try {
                dispatch(uploadFileStart());

                await filesService.uploadFile(file, entityId, (e) => {

                    dispatch(uploadFileProgress(e));
                });
                dispatch(uploadFileSuccess());

                const files = await filesService.getFiles({ entityIds: [entityId] });
                dispatch(getFilesSuccess(files));
            }
            finally {
            }
        };
    },

    deleteFile: (fileId, entityId) => {
        let getFilesSuccess = (files) => { return { type: getFilesSuccessType, files }; };

        return async dispatch => {
            try {

                await filesService.deleteFile({ fileId: fileId });

                const files = await filesService.getFiles({ entityIds: [entityId] });
                dispatch(getFilesSuccess(files));
            }
            finally {
            }
        };
    },

    fetchFiles: (entityId, cache) => {
        let success = (files) => { return { type: getFilesSuccessType, files, entityId: cache ? entityId : undefined }; };

        return async dispatch => {
            const files = entityId ? await filesService.getFiles({ entityIds: [entityId] }) : undefined;
            dispatch(success(files));
        };
    },
};

export const reducer = (state, action) => {
    state = state || initialState;


    if (action.type === uploadFileSuccessType) {
        return {
            ...state,
        };
    }

    if (action.type === uploadFileStartType) {
        return {
            ...state,
        };
    }

    if (action.type === uploadFileProgressType) {
        return {
            ...state,
        };
    }

    if (action.type === getFilesSuccessType) {
        const newState = {
            ...state,
            files: action.files,
        };

        if (action.entityId) {
            if (!newState.filesCache) newState.filesCache = {};

            newState.filesCache[action.entityId] = action.files;
        }

        return newState;
    }

    return state;
};
