let store = {

    _state: {
        profilePage: {
            messageForNewPost: "Its a new text for post",
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 3},
                {id: 2, message: 'Hello, good morning!', likesCount: 5},
                {id: 3, message: 'Hi, how are you?', likesCount: 10},
            ],
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Lola"},
                {id: 2, name: "Vlad"},
                {id: 3, name: "Kusik"},
                {id: 4, name: "Oksana"},
                {id: 5, name: "Sveta"},
                {id: 6, name: "Roma"},
            ],
            messages: [
                {id: 1, message: "Hey dear!"},
                {id: 2, message: "What's gonna on?"},
                {id: 3, message: "Don't repeat yourself!"},
            ],
            newDialogMessage: '',
        },

    },
    _callSubscriber() {
        console.log('state was changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },

    // dispatch(action) {
    //
    //     this._state.profilePage = profileReducer(this._state.profilePage, action)
    //     this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    //     this._callSubscriber()
    //     if (action.type === "ADD-POST") {
    //         let newPost: PostType = {
    //             id: new Date().getTime(),
    //             message: action.postMessage,
    //             likesCount: 0,
    //         }
    //         this._state.profilePage.posts.push(newPost)
    //         this._state.profilePage.messageForNewPost = ''
    //         this._callSubscriber()
    //     } else if (action.type === "POST-TEXT-ONCHANGE") {
    //         this._state.profilePage.messageForNewPost = action.newText
    //         this._callSubscriber()
    //     } else if (action.type === "SEND-DIALOG-MESSAGE") {
    //         let newDialogMessage: MessageType = {
    //             id: new Date().getTime(),
    //             message: action.sendMessage,
    //         }
    //         this._state.dialogsPage.messages.push(newDialogMessage)
    //         this._state.dialogsPage.newDialogMessage = ''
    //         this._callSubscriber()
    //     } else if (action.type === "DIALOG-TEXT-ONCHANGE") {
    //         this._state.dialogsPage.newDialogMessage = action.dialogTextBody
    //         this._callSubscriber()
    //     }
    //}
}


export default store;
