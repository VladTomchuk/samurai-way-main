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

export type postTextOnchangeACType = {
    type: "POST-TEXT-ONCHANGE",
    newText: string,
}

export type addPostACType = {
    type: "ADD-POST"
}

export type setUserProfileACType = {
    type: "SET-USER-PROFILE",
    profile: UserProfileType
}

export type ProfileReducerActionsTypes = addPostACType | postTextOnchangeACType | setUserProfileACType

export type initialProfileStateType = typeof initialState

let initialState = {
    messageForNewPost: "Its a new text for post",
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 3},
        {id: 2, message: 'Hello, good morning!', likesCount: 5},
        {id: 3, message: 'Hi, how are you?', likesCount: 10},
    ] as PostType[],
    profile: null as UserProfileType | null
}

export const profileReducer = (state: initialProfileStateType = initialState, action: ProfileReducerActionsTypes): initialProfileStateType => {

    switch (action.type) {
        case "ADD-POST":
            return {
                ...state, posts: [...state.posts, {
                    id: new Date().getTime(),
                    message: state.messageForNewPost,
                    likesCount: 0,
                }], messageForNewPost: '',
            }
        case "POST-TEXT-ONCHANGE":
            return {...state, messageForNewPost: action.newText}
        case "SET-USER-PROFILE":
            return{
                ...state, profile: action.profile
            }
        default:
            return state
    }
}

export const addPostAC = (): addPostACType => {
    return {
        type: "ADD-POST"
    } as const
}

export const postTextOnchangeAC = (newText: string): postTextOnchangeACType => {
    return {
        type: "POST-TEXT-ONCHANGE",
        newText: newText,
    } as const
}

export const setUserProfile = (profile: UserProfileType): setUserProfileACType => {
    return {
        type: "SET-USER-PROFILE",
        profile: profile
    }
}