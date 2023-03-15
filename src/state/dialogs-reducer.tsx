export type sendDialogMessageACType = {
    type: "SEND-DIALOG-MESSAGE",
    newDialogsMessageBody: string,
}

export type DialogsReducerActionsTypes = sendDialogMessageACType

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
    ] as MessageType[]
}

export const dialogsReducer = (state: initialDialogsPageType = initialState, action: DialogsReducerActionsTypes): initialDialogsPageType => {

    switch (action.type) {
        case "SEND-DIALOG-MESSAGE":
            return {
                ...state,
                messages:
                    [...state.messages, {
                        id: new Date().getTime(),
                        message: action.newDialogsMessageBody,
                    }]
            }
        default:
            return state
    }
}

export const sendDialogMessageAC = (newDialogsMessageBody: string): sendDialogMessageACType => {
    return {type: "SEND-DIALOG-MESSAGE", newDialogsMessageBody} as const
}