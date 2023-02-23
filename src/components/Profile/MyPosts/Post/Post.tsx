import React from "react";
import s from './Post.module.css';
import {PostType} from "../../../../state/profile-reducer";

export const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <img src="" alt=""/>
            {props.message}
            <div>
                <span>Like </span>{props.likesCount}
            </div>
        </div>
    )
}