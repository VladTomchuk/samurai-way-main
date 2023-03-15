import React from "react";
import s from './Users.module.css';
import {Button} from "@mui/material";
import {UserType} from "../../state/users-reducer";
import {NavLink} from "react-router-dom";
import UserPhoto from "../../assets/image/man.png"


type UsersRenderType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: UserType[] // Знаю что так нельзя делать (импортить с редьюсера)
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
}

let Users = (props: UsersRenderType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return <div className={s.users_page_section}>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? s.selectedPage : s.notSelected}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>

        {props.users.map(u => <div key={u.id}>

            <div className={s.user_container}>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                        <div><img className={s.avatar} src={u.photos.small != null ? u.photos.small : UserPhoto}
                                  alt="avatar"/></div>
                    </NavLink>
                    <div className={s.userName}>{u.name}</div>
                    <div>
                        {u.followed
                            ? <Button disabled={props.followingInProgress.some((id: number) => id === u.id)}
                                      variant="contained" size="small" onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</Button>

                            : <Button disabled={props.followingInProgress.some((id: number) => id === u.id)}
                                      variant="contained" size="small" onClick={() => {
                                props.follow(u.id)
                            }}>Follow</Button>
                        }</div>
                </div>
                <div>{u.status}</div>
            </div>
        </div>)}
    </div>

}

export default Users;