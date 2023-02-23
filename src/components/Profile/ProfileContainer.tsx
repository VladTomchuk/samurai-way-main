import React from "react";
// import s from './Profile.module.css';
// import {ProfileItem} from "./ProfileItem/ProfileItem";
// import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {default as axios} from "axios";
import {setUserProfile, UserProfileType} from "../../state/profile-reducer";
import {AppStateType} from "../../state/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";


type PathParamsType = {
    userId: string
}

type mapStateToPropsType = {
    profile: UserProfileType | null

}

type mapDispatchToPropsType = {
    setUserProfile: (profile: UserProfileType) => void
}

export type UserProfilePropsType = mapDispatchToPropsType & mapStateToPropsType

type PropsType = RouteComponentProps<PathParamsType> & UserProfilePropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = +this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        usersAPI.profile(userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            })
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }

}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profileReducer.profile
}) // Когда функция возвращает обьект нужно оборачивать в круглые скобки тело обекта

let WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithURLDataContainerComponent)