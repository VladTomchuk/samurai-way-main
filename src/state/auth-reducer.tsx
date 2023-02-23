type setAuthUserDataACType = {
    type: "SET_USER_DATA",
    data: {
        userId: number,
        email: string,
        login:string,
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
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId: number, email: string, login: string): setAuthUserDataACType => {
    return {
        type: "SET_USER_DATA",
        data: {userId, email, login}
    } as const
}