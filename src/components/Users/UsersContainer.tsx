import React from "react";
import {connect} from "react-redux";

import {
    follow, getUsers,
    setCurrentPage,
    toggleFollowingProgress, unfollow,
    unfollowSuccess,
    UserType
} from "../../state/users-reducer";
import {AppStateType} from "../../state/redux-store";
import Users from "./Users";
import Preloader from "../common/Preloader";


class UsersContainer extends React.Component<UsersPageType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber,this.props.pageSize)
    }

    render() {
        return <>
            <div>{this.props.isFetching ? <Preloader/> : null}</div>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                //toggleFollowingProgress={this.props.toggleFollowingInProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

type mapStateToPropsType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}

type mapDispatchToProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    //setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    //setTotalUsersCount: (totalCount: number) => void
    //toggleIsFetching: (isFetching: boolean) => void
    //toggleFollowingInProgress: (isFetching: boolean, userId: number) => void
    getUsers:(currentPage:number, pageSize:number)=>void
}

export type UsersPageType = mapStateToPropsType & mapDispatchToProps

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.userReducer.users,
        pageSize: state.userReducer.pageSize,
        totalUsersCount: state.userReducer.totalUsersCount,
        currentPage: state.userReducer.currentPage,
        isFetching: state.userReducer.isFetching,
        followingInProgress: state.userReducer.followingInProgress
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    //setUsers,
    setCurrentPage,
    //setTotalUsersCount,
    //toggleIsFetching,
    //toggleFollowingInProgress: toggleFollowingProgress,
    getUsers
})(UsersContainer);