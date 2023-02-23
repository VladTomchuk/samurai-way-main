export type dialogTextOnchangeACType = {
    type: "DIALOG-TEXT-ONCHANGE",
    dialogTextBody: string
}

export type sendDialogMessageACType = {
    type: "SEND-DIALOG-MESSAGE",
    sendMessage: string,
}

export type DialogsReducerActionsTypes = dialogTextOnchangeACType | sendDialogMessageACType

export type MessageType = {
    id: number
    message: string
}

export type DialogType = {
    id: number
    name: string
}

export type initialDialogsPageType = typeof initialState

let initialState = {
    dialogs: [
        {id: 1, name: "Lola"},
        {id: 2, name: "Vlad"},
        {id: 3, name: "Kusik"},
        {id: 4, name: "Oksana"},
        {id: 5, name: "Sveta"},
        {id: 6, name: "Roma"},
    ] as DialogType[],
    messages: [
        {id: 1, message: "Hey dear!"},
        {id: 2, message: "What's gonna on?"},
        {id: 3, message: "Don't repeat yourself!"},
    ] as MessageType[],
    newDialogMessage: ''
}

export const dialogsReducer = (state: initialDialogsPageType = initialState, action: DialogsReducerActionsTypes): initialDialogsPageType => {

    switch (action.type) {
        case "DIALOG-TEXT-ONCHANGE":
            return {...state, newDialogMessage: action.dialogTextBody}
        case "SEND-DIALOG-MESSAGE":
            return {
                ...state,
                messages:
                    [...state.messages, {
                        id: new Date().getTime(),
                        message: action.sendMessage,
                    }], newDialogMessage: '',
            }
        default:
            return state
    }
}

export const dialogTextOnchangeAC = (dialogTextBody: string): dialogTextOnchangeACType => {
    return {
        type: "DIALOG-TEXT-ONCHANGE",
        dialogTextBody: dialogTextBody
    } as const
}

export const sendDialogMessageAC = (sendMessage: string): sendDialogMessageACType => {
    return {
        type: "SEND-DIALOG-MESSAGE",
        sendMessage: sendMessage,
    } as const
}