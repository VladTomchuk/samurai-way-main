import React from "react";
import { UserProfilePropsType} from "../ProfileContainer";
import Preloader from "../../common/Preloader";
import s from './ProfileItem.module.css'
import {UserProfileType} from "../../../state/profile-reducer";

type PropsType = {
    profile: UserProfileType | null
}

export const ProfileItem = (props: PropsType) => {

    if (!props.profile){
        return <Preloader/>
    }

    return (
        <div className={s.profileItemContainer}>
            <div className={s.profileInfoContainer}>
                <div><img src={props.profile.photos.small} alt="avatar"/></div>
                <div className={s.profileDetailsBox}>
                    <div><b>Name:</b> {props.profile.fullName}</div>
                    <div><b>Open to work:</b>{props.profile.lookingForAJob ? <span>Yes</span> : <span>No</span>}</div>
                    <div><b>Status:</b> {props.profile.lookingForAJobDescription}</div>
                    <div><b>GitHub:</b> {props.profile.contacts.github}</div>
                </div>

            </div>

        </div>
    )
}