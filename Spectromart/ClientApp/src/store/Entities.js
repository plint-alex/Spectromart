import { actionCreators as filesActions } from './Files';
import { actionCreators as layoutActions } from './Layout';
import apiRequest from '../services/api';
import history from '../history';

const baseUrl = 'entities/';


const getEntitySuccessType = 'GET_ENTITY_SUCCESS';
const getEntitiesSuccessType = 'GET_ENTITIES_SUCCESS';

const initialState = {};

export const actionCreators = {
    addEntity: (data) => {

        return async dispatch => {
            dispatch(layoutActions.loading());
            try {
                await apiRequest(`${baseUrl}addEntity`, 'POST', data);
            }
            finally {
                dispatch(layoutActions.loadingComplete());
            }
        };
    },

    addEntityAndSelect: (data, entityId) => {

        return async dispatch => {
            dispatch(layoutActions.loading());
            let result;
            try {
                result = await apiRequest(`${baseUrl}addEntity`, 'POST', data);

                history.push(`/admin/${result.id}`);
                commonOperations.selectEntity(dispatch, result.id);
            }
            finally {
                dispatch(layoutActions.loadingComplete());
            }

            //commonOperations.fetchEntities(dispatch, { parentIds: [entityId] }, 'children');
            //commonOperations.fetchEntities(dispatch, { idsToFindParents: [result.id] }, 'parents');
        };
    },

    updateEntity: (data) => {
        return async dispatch => {
            dispatch(layoutActions.loading());

            try {
                await apiRequest(`${baseUrl}updateEntity`, 'POST', data);
            }
            finally {
                dispatch(layoutActions.loadingComplete());
            }

            commonOperations.fetchEntities(dispatch, { parentIds: [data.id] }, 'children');
            commonOperations.fetchEntities(dispatch, { idsToFindParents: [data.id] }, 'parents');
        };
    },

    selectEntity: (id) => {
        return async dispatch => {
            dispatch(filesActions.fetchFiles(id));
            commonOperations.selectEntity(dispatch, id);
            commonOperations.fetchEntities(dispatch, { parentIds: [id] }, 'children');
            commonOperations.fetchEntities(dispatch, { idsToFindParents: [id] }, 'parents');
        };
    },

    fetchEntity: (id) => {
        return async dispatch => {
            const entity = id ? await apiRequest(`${baseUrl}getEntity/${id}`, 'GET') : undefined;
            dispatch({ type: getEntitySuccessType, entity });
        };
    },

    fetchEntities: (data, storageVariable, cache) => {
        return async dispatch => {
            commonOperations.fetchEntities(dispatch, data, storageVariable, cache);
        };
    },

    deleteEntity: (data, entityId) => {
        return async dispatch => {
            
            await apiRequest(`${baseUrl}deleteEntity`, 'POST', data);

            commonOperations.fetchEntities(dispatch, entityId ? { parentIds: [entityId] } : {}, 'children');
        };
    },

    addParent: (data) => {
        return async dispatch => {

            await apiRequest(`${baseUrl}addParent`, 'POST', data);

            commonOperations.fetchEntities(dispatch, { idsToFindParents: [data.id] }, 'parents');
        };
    },

    removeParent: (data) => {
        return async dispatch => {

            await apiRequest(`${baseUrl}removeParent`, 'POST', data);

            commonOperations.fetchEntities(dispatch, { idsToFindParents: [data.id] }, 'parents');
        };
    },
};



const commonOperations = {
    selectEntity: async (dispatch, id) => {
        const entity = id ? await apiRequest(`${baseUrl}getEntity/${id}`, 'GET') : undefined;
        dispatch({ type: getEntitySuccessType, entity });
    },

    fetchEntities: async (dispatch, data, storageVariable, cache) => {
        const entities = (!data.ids && !data.parentIds && !data.idsToFindParents) || (data.ids && data.ids[0]) || (data.parentIds && data.parentIds[0]) || (data.idsToFindParents && data.idsToFindParents[0]) ?
            await apiRequest(`${baseUrl}getEntities`, 'POST', data) : undefined;
        dispatch({ type: getEntitiesSuccessType, entities, storageVariable, cache });
    },
};

export const reducer = (state, action) => {
    state = state || initialState;


    if (action.type === getEntitiesSuccessType) {
        var newState = { ...state };
        newState[action.storageVariable] = action.entities;

        if (action.cache) {
            if (!newState.entities) newState.entities = {};

            for (let entity of action.entities) {
                newState.entities[entity.id] = entity;
            }
        }

        return newState;
    }

    if (action.type === getEntitySuccessType) {
        return {
            ...state,
            currentEntity: action.entity,
        };
    }

    return state;
};
