import React from "react";
import s from './MyPosts.module.css';
import {addPostAC, initialProfileStateType, postTextOnchangeAC} from "../../../state/profile-reducer";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../state/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";


type mapStateToPropsType = {
    profilePage: initialProfileStateType,
}

type mapDispatchToProps = {
    addPost: () => void
    newTextChangeHandler: (newText: string) => void
}

export type profilePageType = mapStateToPropsType & mapDispatchToProps

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        profilePage: state.profileReducer
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProps => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        newTextChangeHandler: (newText: string) => {
            dispatch(postTextOnchangeAC(newText))
        },
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);