import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {
    getStatus,
    getUserProfileThunk,
    updateStatus,
    UserProfileType
} from "../../state/profile-reducer";
import {AppStateType} from "../../state/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


type PathParamsType = {
    userId: string
}

type mapStateToPropsType = {
    profile: UserProfileType | null,
    status: string
}

type mapDispatchToPropsType = {
    getUserProfileThunk: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status:string) => void
}

export type UserProfilePropsType = mapDispatchToPropsType & mapStateToPropsType

export type PropsType = RouteComponentProps<PathParamsType> & UserProfilePropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = +this.props.match.params.userId
        if (!userId) {
            userId = 27878
        }
        this.props.getUserProfileThunk(userId)
        this.props.getStatus(userId)
    }
    render() {
        return <Profile
            {...this.props}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
        />
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profileReducer.profile,
    status: state.profileReducer.status
}) // Когда функция возвращает обьект нужно оборачивать в круглые скобки тело обекта (чтоб не писать return)

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileThunk, getStatus, updateStatus}), //#3
    withRouter, //#2
    WithAuthRedirect, //#1
)(ProfileContainer)