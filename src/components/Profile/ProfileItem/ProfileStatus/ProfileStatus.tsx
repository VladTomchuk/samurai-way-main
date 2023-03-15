import React, {ChangeEvent} from "react";

type PropsType = {
    status: string
    updateStatus: (status:string) => void
}

export class ProfileStatus extends React.Component <PropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        console.log("this:", this)
        this.setState({ // setState - асинхронен
            editMode: true,
        })
    }

    deactivateEditMode = () => {
        this.setState({ // setState - асинхронен
            editMode: false
        })
        this.props.updateStatus(this.state.status)
        //this.forceUpdate() // Использовать в крайних случаях как кастыль
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>) { // непонятная типизация!!!!!

    if (prevProps.status !== this.props.status){
        this.setState({
            status: this.props.status
        })
    }
    }

    render() {
        return (
            <div><b>Status: </b>
                {!this.state.editMode &&
                    <div><span onDoubleClick={this.activateEditMode}>{this.props.status || "NO STATUS"}</span></div>
                }
                {this.state.editMode &&
                    <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                                value={this.state.status}/></div>
                }
            </div>
        )
    }

}