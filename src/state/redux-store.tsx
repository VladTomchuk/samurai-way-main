import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {userReducer} from "./users-reducer";
import {authMeReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'

let rootReducer = combineReducers({
    profileReducer,
    dialogsReducer,
    userReducer,
    authMeReducer,
    form: formReducer
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof rootReducer>

export default store;

// @ts-ignore
window.store = store;
