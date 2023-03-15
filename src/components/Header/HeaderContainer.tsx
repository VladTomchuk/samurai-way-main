import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../state/redux-store";
import {initialAuthDataType, logOut, setAuthUserDataThunk} from "../../state/auth-reducer";


type mapStateToProps = {
    data: initialAuthDataType
}
type mapDispatchToProps = {
    setAuthUserDataThunk: () => void
    logOut: () => void
}

export type commonMapsToPropsType = mapDispatchToProps & mapStateToProps

class HeaderContainer extends React.Component<commonMapsToPropsType> {

    componentDidMount() {
        this.props.setAuthUserDataThunk()
    }

    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state: AppStateType): mapStateToProps => ({
    data: state.authMeReducer,
})

export default connect(mapStateToProps, {setAuthUserDataThunk, logOut})(HeaderContainer)