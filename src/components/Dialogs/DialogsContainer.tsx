import React from "react";
import {initialDialogsPageType, sendDialogMessageAC} from "../../state/dialogs-reducer";
import {AppStateType} from "../../state/redux-store";
import {Dialogs} from "./Dialogs";
import {compose, Dispatch} from "redux";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


type mapStateToPropsType = {
    state: initialDialogsPageType
}

type mapDispatchToProps = {
    sendMessageHandler: (newDialogsMessageBody: string)=>void
}

export type dialogsPageType = mapStateToPropsType & mapDispatchToProps

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        state: state.dialogsReducer
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProps => {
    return {
        sendMessageHandler: (newDialogsMessageBody: string) => {
            dispatch(sendDialogMessageAC(newDialogsMessageBody))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(Dialogs) as React.ElementType