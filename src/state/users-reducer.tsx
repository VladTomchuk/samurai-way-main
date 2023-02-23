import {usersAPI} from "../api/api";

export type UserType = {
    id: number
    name: string
    uniqueUrlName: string
    photos: {
        small: string,
        large: string
    }
    status: string
    followed: boolean
}

type followACType = {
    type: "FOLLOW",
    userId: number
}

type unfollowACType = {
    type: "UNFOLLOW",
    userId: number,
}

type setUsersACType = {
    type: "SET-USERS",
    users: UserType[],
}

type setCurrentPageACType = {
    type: "SET-CURRENT-PAGE",
    currentPage: number,

}

type setTotalUsersCountACType = {
    type: "SET-TOTAL-COUNT",
    totalCount: number,
}

type toggleIsFetchingACType = {
    isFetching: boolean,
    type: "TOGGLE-IS-FETCHING",
}

type toggleFollowingInProgressACType = {
    type: "TOGGLE-IS-FOLLOWING-PROGRESS",
    isFetching: boolean,
    userId: number
}
type usersReducersActionsTypes =
    followACType
    | unfollowACType
    | setUsersACType
    | setCurrentPageACType
    | setTotalUsersCountACType
    | toggleIsFetchingACType
    | toggleFollowingInProgressACType

export type initialUsersStateType = typeof initialState

let initialState = {
    users: [] as UserType[],
    pageSize: 100 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true,
    followingInProgress: [] as any,// какой тип поставить?
}

export const userReducer = (state: initialUsersStateType = initialState, action: usersReducersActionsTypes): initialUsersStateType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case "SET-USERS":
            return {
                ...state,
                users: action.users,
            }
        case "SET-CURRENT-PAGE":
            return {
                ...state, currentPage: action.currentPage
            }
        case "SET-TOTAL-COUNT":
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case "TOGGLE-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter((userId: number) => userId != action.userId)]
            }
        default:
            return state
    }
}

export const followSuccess = (userId: number): followACType => {
    return {
        type: "FOLLOW",
        userId: userId,
    } as const
}

export const unfollowSuccess = (userId: number): unfollowACType => {
    return {
        type: "UNFOLLOW",
        userId: userId,
    } as const
}

export const setUsers = (users: UserType[]): setUsersACType => {
    return {
        type: "SET-USERS",
        users: users,
    }
}

export const setCurrentPage = (currentPage: number): setCurrentPageACType => {
    return {
        type: "SET-CURRENT-PAGE",
        currentPage: currentPage,
    }
}

export const setTotalUsersCount = (totalCount: number): setTotalUsersCountACType => {
    return {
        type: "SET-TOTAL-COUNT",
        totalCount: totalCount,
    }
}

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACType => {
    return {
        type: "TOGGLE-IS-FETCHING",
        isFetching: isFetching,
    }
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingInProgressACType => {
    return {
        type: "TOGGLE-IS-FOLLOWING-PROGRESS",
        isFetching: isFetching,
        userId: userId,
    }
}


export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => { // как правильно выбрать тип
        dispatch(toggleIsFetching(true))

        usersAPI.getUsers(currentPage, pageSize).then((data) => { // как правильно выбрать тип

            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        })
    }
}

export const follow = (userId: number) => {
    return (dispatch: any) => { // как правильно выбрать тип
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: any) => { // как правильно выбрать тип
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
    }
}