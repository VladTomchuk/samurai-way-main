import React from "react";
import {addPostAC, initialProfileStateType} from "../../../state/profile-reducer";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../state/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";


type mapStateToPropsType = {
    profilePage: initialProfileStateType,
}

type mapDispatchToProps = {
    addPost: (messageForNewPost:string) => void
}

export type profilePageType = mapStateToPropsType & mapDispatchToProps

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        profilePage: state.profileReducer
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProps => {
    return {
        addPost: (messageForNewPost) => {
            dispatch(addPostAC(messageForNewPost))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);