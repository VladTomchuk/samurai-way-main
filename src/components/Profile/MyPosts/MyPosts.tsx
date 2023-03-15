import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {profilePageType} from "./MyPostsContainer";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../validators";
import {Textarea} from "../../common/formsControls/FormsControls";

const maxLength10 = maxLengthCreator(10)

export const MyPosts = (props: profilePageType) => {

    const state = props.profilePage

    let posts = state.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (values: any) => {
        props.addPost(values.messageForNewPost)
    }

    return (
        <div>
            My posts
            <MessageForNewPostFormRedux onSubmit={onAddPost}/>
            {posts}
        </div>
    )
}

const MessageForNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                placeholder={"Type here something..."}
                name={"messageForNewPost"}
                component={Textarea}
                validate={[required, maxLength10]}/>
            <button>Add post</button>
        </form>
    )
}

const MessageForNewPostFormRedux = reduxForm({form: "MessageForNewPostForm"})(MessageForNewPostForm)