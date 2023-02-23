import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {dialogsPageType} from "./DialogsContainer";


export const Dialogs = (props: dialogsPageType) => {

    let dialogsElements = props.state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)

    let onHewDialogTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let dialogTextBody = e.currentTarget.value
        props.newDialogTextHandler(dialogTextBody)
    }

    let onSendMessageHandler = () => {
        let DialogMessageBody = props.state.newDialogMessage
        props.sendMessageHandler(DialogMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea placeholder={'Type your message here...'} onChange={onHewDialogTextHandler}
                              value={props.state.newDialogMessage}/>
                </div>
                <div>
                    <button onClick={onSendMessageHandler}>Send</button>
                </div>
            </div>
        </div>
    )
}