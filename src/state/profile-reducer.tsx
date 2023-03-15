import {profileAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";

export type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

export type PostType = {
    message: string
    likesCount: number
    id: number
}

export type addPostACType = {
    type: "ADD-POST",
    messageForNewPost: string
}

export type setUserProfileACType = {
    type: "SET-USER-PROFILE",
    profile: UserProfileType
}

export type setStatusType = {
    status: string,
    type: "SET-STATUS",
}

export type ProfileReducerActionsTypes = addPostACType | setUserProfileACType | setStatusType

export type initialProfileStateType = typeof initialState

let initialState = {
    messageForNewPost: "Its a new text for post",
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 3},
        {id: 2, message: 'Hello, good morning!', likesCount: 5},
        {id: 3, message: 'Hi, how are you?', likesCount: 10},
    ] as PostType[],
    profile: null as UserProfileType | null,
    status: "" as string
}

export const profileReducer = (state: initialProfileStateType = initialState, action: ProfileReducerActionsTypes): initialProfileStateType => {

    switch (action.type) {
        case "ADD-POST":
            return {
                ...state, posts: [...state.posts, {
                    id: new Date().getTime(),
                    message: action.messageForNewPost,
                    likesCount: 0,
                }]
            }

        case "SET-USER-PROFILE":
            return {
                ...state, profile: action.profile
            }
        case "SET-STATUS":
            return {
                ...state, status: action.status
            }
        default:
            return state
    }
}

export const addPostAC = (messageForNewPost: string): addPostACType => {
    return {type: "ADD-POST", messageForNewPost} as const
}

export const setUserProfile = (profile: UserProfileType): setUserProfileACType => {
    return {
        type: "SET-USER-PROFILE",
        profile: profile
    }
}

export const setStatusAC = (status: string): setStatusType => {
    return {
        type: "SET-STATUS",
        status: status
    } as const
}

export const getUserProfileThunk = (userId: number) => {
    return (dispatch: Dispatch) => {

        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            })
    }
}

export const getStatus = (userId: number) => {
    return (dispatch: Dispatch) => {

        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatusAC(response.data))
            })

    }
}

export const updateStatus = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                console.log(response)
                if (response.data.resultCode === 0) {
                    dispatch(setStatusAC(status))
                }
            })

    }
}