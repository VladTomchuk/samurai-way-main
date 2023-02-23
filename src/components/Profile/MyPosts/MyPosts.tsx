import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {profilePageType} from "./MyPostsContainer";


export const MyPosts = (props: profilePageType) => {

    const state = props.profilePage

    let posts = state.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = () => {
        props.addPost()
    }

    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value
        props.newTextChangeHandler(newText)
    }

    return (
        <div>
            My posts
            <div>
                <textarea value={state.messageForNewPost} onChange={newTextChangeHandler}/>
                <button onClick={onAddPost}>Add post</button>
            </div>
            {posts}
        </div>
    )
}