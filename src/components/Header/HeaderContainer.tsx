import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../state/redux-store";
import {initialAuthDataType, setAuthUserData} from "../../state/auth-reducer";
import {default as axios} from "axios";
import {usersAPI} from "../../api/api";

type mapStateToProps = {
    data: initialAuthDataType
}
type mapDispatchToProps = {
    setAuthUserData: (userId: number, email: string, login: string) => void
}

export type commonMapsToPropsType = mapDispatchToProps & mapStateToProps

class HeaderContainer extends React.Component<commonMapsToPropsType> {

    componentDidMount() {
        usersAPI.authMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state: AppStateType): mapStateToProps => ({
    data: state.authMeReducer,
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)