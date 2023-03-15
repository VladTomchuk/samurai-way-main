import {authAPI} from "../api/api";
import {Dispatch} from "redux";

type setAuthUserDataACType = {
    type: "SET_USER_DATA",
    payload: {
        userId: number
        email: string,
        login: string,
        isAuth:boolean
    }
}

type AuthMeReducerActionsTypes = setAuthUserDataACType

export type initialAuthDataType = typeof initialState

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean | null
}

export const authMeReducer = (state: initialAuthDataType = initialState, action: AuthMeReducerActionsTypes): initialAuthDataType => {

    switch (action.type) {
        case "SET_USER_DATA":
            console.log('alalalala')
            return {
                ...state,
                ...action.payload,
                //isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId:any, email: any, login: any, isAuth:boolean): setAuthUserDataACType => { // Який тип проставити щоб не падала помилка в outLog
    return {
        type: "SET_USER_DATA",
        payload: {userId, email, login, isAuth}
    } as const
}

export const setAuthUserDataThunk = () => {

    return (dispatch: Dispatch) => {
        authAPI.authMe().then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
    }
}

export const login = (email:string, password:string,rememberMe:boolean) => {

    return (dispatch: Dispatch) => {
        authAPI.login(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch<any>(setAuthUserDataThunk())
            }
        })
    }
}

export const logOut = () => {

    return (dispatch: Dispatch) => {
        authAPI.outLog().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null ,null,null,false))
            }
        })
    }
}