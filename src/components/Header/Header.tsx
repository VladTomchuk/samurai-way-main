import React from "react";
import s from './Header.module.css';
import {commonMapsToPropsType} from "./HeaderContainer";
import {NavLink} from "react-router-dom";


export const Header = (props:commonMapsToPropsType) => {
    return (
        <header className={s.header}>

            <img src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png" alt=""/>

            <div className={s.loginBlock}>
                {props.data.isAuth
                    ? <div>{props.data.login} - <button onClick={props.logOut}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}

            </div>
        </header>
    )
}