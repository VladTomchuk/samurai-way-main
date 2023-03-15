import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../state/redux-store";
import {connect} from "react-redux";


type mapStateToProsForRedirect = {
    isAuth: boolean | null
}

let mapStateToPropsForRedirect = (state: AppStateType): mapStateToProsForRedirect => ({
    isAuth: state.authMeReducer.isAuth
})

export function WithAuthRedirect<T>(Component: ComponentType<T>) {
    class RedirectComponent extends React.Component<mapStateToProsForRedirect> {
        render() {
            let {isAuth, ...restProps} = this.props
            if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...restProps as T}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}