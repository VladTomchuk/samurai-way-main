import s from "./Message.module.css";
import React from "react";
import {MessageType} from "../../../state/dialogs-reducer";

export const Message: React.FC<MessageType> = (props) => {
    return (
        <div className={s.dialog}>
            {props.message}
        </div>
    )
}