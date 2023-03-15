import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/formsControls/FormsControls";
import {maxLengthCreator, required} from "../../validators";
import {connect} from "react-redux";
import {login} from "../../state/auth-reducer";
import {AppStateType} from "../../state/redux-store";
import {Redirect} from "react-router-dom";


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type mapStateToPropsType = {
    isAuth: boolean
}
type loginPropsType = mapDispatchToPropsType & mapStateToPropsType

const maxLenght50 = maxLengthCreator(50)

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.authMeReducer.isAuth
})

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, maxLenght50]} placeholder={'Email'} name={"email"} component={Input}/>
            </div>
            <div>
                <Field validate={[required, maxLenght50]} placeholder={'Password'} name={"password"} component={Input}
                       type="password"/>
            </div>
            <div>
                <Field validate={[required]} component={Input} name={"rememberMe"} type="checkbox"/> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

const Login = (props: any) => {  // typification ?
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
        console.log(formData)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export const LoginContainer = connect(mapStateToProps, {login})(Login)