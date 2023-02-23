import React from "react";
import s from './Profile.module.css';
import {ProfileItem} from "./ProfileItem/ProfileItem";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import { UserProfilePropsType} from "./ProfileContainer";


export const Profile = (props:UserProfilePropsType) => {
    return (
        <div>
            <div>
                <img className={s.image}
                     src="https://www.bfoto.ru/news/wp-content/uploads/2014/01/oboi-rabochego-stola_1920-1080.jpg"
                     alt=""/>
            </div>
            <ProfileItem profile={props.profile} />
            <MyPostsContainer/>
        </div>
    )
}