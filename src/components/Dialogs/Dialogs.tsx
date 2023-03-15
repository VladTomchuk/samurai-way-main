import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {dialogsPageType} from "./DialogsContainer";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/formsControls/FormsControls";
import {maxLengthCreator, required} from "../../validators";

const maxLentgh50 = maxLengthCreator(50)

export const Dialogs = (props: dialogsPageType) => {

    let dialogsElements = props.state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)

    let addNewMessage = (values:any) => {
        props.sendMessageHandler(values.newDialogsMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
                <DialogsMessageFormRedux onSubmit={addNewMessage}/>

            </div>
        </div>
    )
}

const DialogsMessageForm = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={'Type your message here...'}
                    name={"newDialogsMessageBody"}
                    component={Textarea}
                    validate={[required, maxLentgh50]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const DialogsMessageFormRedux = reduxForm({form: "dialogsAddMessageForm"})(DialogsMessageForm)