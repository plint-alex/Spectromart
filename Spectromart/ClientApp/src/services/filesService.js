import apiRequest, { getUrl, upload } from './api';


const baseUrl = 'api/';

export default {
    getFileUrl: (id, fileName) => {
        return getUrl(`files/getFile/${id}` + (fileName ? `/${fileName}` : ''), 'GET');
    },
    getFiles: async (data) => {
        return await apiRequest('files/getFiles', 'POST', data);
    },
    uploadFile: async (file, entityId, onProgress) => {

        let formData = new FormData();

        formData.set("file", file, file.name);
        formData.set("entityId", entityId);

        await upload(baseUrl + 'files/addFile', { method: 'POST', body: formData }, onProgress);
    },
    deleteFile: async (data) => {
        await apiRequest('files/deleteFile', 'POST', data);
    },
};


