import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
//import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk-recursion-detect';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';
import { connectRouter, routerMiddleware } from "connected-react-router";
import { reducer as reduxFormReducer } from 'redux-form';
import * as Authentication from './Authentication';
import * as Entities from './Entities';
import * as Files from './Files';
import * as Layout from './Layout';
import * as Notifier from './Notifier';
//import stringHash from 'string-hash';

export default function configureStore(history, initialState) {

    const errorHandler = (err) => {
        console.error(err); // write the error to the console
        return (dispatch/*, getState*/) => { // or return a thunk

            dispatch(Notifier.actionCreators.enqueueSnackbar({
                message: err.message,
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error'
                },
            }));
        }
    }

    const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({ onError: errorHandler });

    const middleware = [
        errorHandlerMiddleware,
        thunkMiddleware,
        //thunk,
        routerMiddleware(history)
    ];


    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const reducers = combineReducers({
        entities: Entities.reducer,
        files: Files.reducer,
        authentication: Authentication.reducer,
        layout: Layout.reducer,
        notifier: Notifier.reducer,
        router: connectRouter(history),
        form: reduxFormReducer, // mounted under "form"
    });

    const rootReducer = (state, action) => {
        if (action.type === Authentication.logoutType) {
            state = undefined
        }
        return reducers(state, action)
    }

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
