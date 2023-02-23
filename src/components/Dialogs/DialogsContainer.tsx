import React from "react";
import s from './Dialogs.module.css';
import {dialogTextOnchangeAC, initialDialogsPageType, sendDialogMessageAC} from "../../state/dialogs-reducer";
import {AppStateType} from "../../state/redux-store";
import {Dialogs} from "./Dialogs";
import {Dispatch} from "redux";
import {connect} from "react-redux";


type mapStateToPropsType = {
    state: initialDialogsPageType
}

type mapDispatchToProps = {
    newDialogTextHandler: (dialogTextBody: string)=>void
    sendMessageHandler: (DialogMessageBody: string)=>void
}

export type dialogsPageType = mapStateToPropsType & mapDispatchToProps

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        state: state.dialogsReducer
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProps => {
    return {
        newDialogTextHandler: (dialogTextBody: string) => {
            dispatch(dialogTextOnchangeAC(dialogTextBody))
        },
        sendMessageHandler: (DialogMessageBody: string) => {
            dispatch(sendDialogMessageAC(DialogMessageBody))
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)