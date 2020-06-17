import React from 'react'
import Feather from '../../feather'
import SignIn from './AuthenticationForm_SignIn.js'
import SignUp from './AuthenticationForm_SignUp.js'
import ForgotPassword from './AuthenticationForm_ForgotPassword.js'
import { defaultFormStyle } from './AuthenticationFormStyles.js'

const INITIAL_STATE = {
  emailInput: '',
  usernameInput: '',
  passwordInput: '',
  confirmPasswordInput: '',
  formType: 'sign_in'
}

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onChangeInput = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  onClickFormTypeButton = (event) => {
    event.preventDefault()
    this.setState({ formType: [event.target.name] })
  }

  onSubmit = (event) => {
    event.preventDefault()

    // TODO
    const apiKey = 'live_ZkPKKTbXR2MkJ0RIiueGVWGZA9yBJM'
    const config = { host: 'localhost', port: '8080', protocol: 'http' }
    const client = Feather(apiKey, config)
    client.credentials
      .create({
        type: 'email|password',
        email: this.state.emailInput,
        password: this.state.passwordInput
      })
      .then((credential) => {
        // A new credential
        console.log(credential)
      })
      .catch((error) => {
        // Handle an error
        console.log(error)
      })
  }

  render() {
    var signInFields = this.props.signInFields
    var signUpFields = this.props.signUpFields
    if (!signInFields) {
      signInFields = []
    }
    if (!signUpFields) {
      signUpFields = []
    }
    return (
      <form style={defaultFormStyle}>
        {this.state.formType == 'sign_in' && (
          <SignIn
            form={this.props.signInForm}
            onSubmit={this.onSubmit}
            onChangeInput={this.onChangeInput}
            onClickFormTypeButton={this.onClickFormTypeButton}
            linkToSignUp={!!this.props.signUpForm}
            linkToForgotPassword={!!this.props.forgotPasswordForm}
            input={{
              email: this.state.emailInput,
              username: this.state.usernameInput,
              password: this.state.passwordInput
            }}
          />
        )}
        {this.state.formType == 'sign_up' && (
          <SignUp
            form={this.props.signUpForm}
            onSubmit={this.onSubmit}
            onChangeInput={this.onChangeInput}
            onClickFormTypeButton={this.onClickFormTypeButton}
            linkToSignIn={!!this.props.signInForm}
            input={{
              email: this.state.emailInput,
              username: this.state.usernameInput,
              password: this.state.passwordInput,
              confirmPassword: this.state.confirmPasswordInput
            }}
          />
        )}
        {this.state.formType == 'forgot_password' && (
          <ForgotPassword
            form={this.props.forgotPasswordForm}
            onSubmit={this.onSubmit}
            onChangeInput={this.onChangeInput}
            onClickFormTypeButton={this.onClickFormTypeButton}
            input={{
              email: this.state.emailInput
            }}
          />
        )}
      </form>
    )
  }
}

// {this.props.forgotPasswordTitle && (
//   <p style={defaultTitleStyle}>{this.props.forgotPasswordTitle}</p>
// )}
// <div style={defaultInputStyle}>
//   <p style={defaultInputTitleStyle}>Email</p>
//   <input
//     type='email'
//     name='emailInput'
//     onChange={this.onChangeInput}
//     value={this.state.emailInput}
//     style={defaultInputFieldStyle}
//   />
// </div>
// <div
//   style={{
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%'
//   }}
// >
//   {signUpFields.length > 0 && (
//     <button
//       type='submit'
//       name='sign_in'
//       onClick={this.onClickFormTypeButton}
//       style={defaultFormStyleButton}
//     >
//       {this.props.submitButtonTitle
//         ? this.props.submitButtonTitle
//         : 'Cancel'}
//     </button>
//   )}
//   <button
//     type='submit'
//     onClick={this.onSubmit}
//     style={defaultSubmitButtonStyle}
//   >
//     {this.props.signInSubmitButtonTitle
//       ? this.props.signInSubmitButtonTitle
//       : 'Continue'}
//   </button>
// </div>
// </div>

///////////////////////////////////////////////////////////////

// <div>
// {this.props.signUpTitle && (
//   <p style={defaultTitleStyle}>{this.props.signUpTitle}</p>
// )}
// {signUpFields.includes('username') && (
//   <div style={defaultInputStyle}>
//     <p style={defaultInputTitleStyle}>Username</p>
//     <input
//       type='text'
//       name='usernameInput'
//       onChange={this.onChangeInput}
//       value={this.state.usernameInput}
//       style={defaultInputFieldStyle}
//     />
//   </div>
// )}
// {signUpFields.includes('email') && (
//   <div style={defaultInputStyle}>
//     <p style={defaultInputTitleStyle}>Email</p>
//     <input
//       type='email'
//       name='emailInput'
//       onChange={this.onChangeInput}
//       value={this.state.emailInput}
//       style={defaultInputFieldStyle}
//     />
//   </div>
// )}
// {signUpFields.includes('password') && (
//   <div style={defaultInputStyle}>
//     <p style={defaultInputTitleStyle}>Password</p>
//     <input
//       type='password'
//       name='passwordInput'
//       onChange={this.onChangeInput}
//       value={this.state.passwordInput}
//       style={defaultInputFieldStyle}
//     />
//   </div>
// )}
// {signUpFields.includes('confirmPassword') && (
//   <div style={defaultInputStyle}>
//     <p style={defaultInputTitleStyle}>Confirm password</p>
//     <input
//       type='password'
//       name='passwordInput'
//       onChange={this.onChangeInput}
//       value={this.state.confirmPasswordInput}
//       style={defaultInputFieldStyle}
//     />
//   </div>
// )}
// <div
//   style={{
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%'
//   }}
// >
//   {signInFields.length > 0 && (
//     <button
//       type='submit'
//       name='sign_in'
//       onClick={this.onClickFormTypeButton}
//       style={defaultFormStyleButton}
//     >
//       {this.props.signUpButtonTitle
//         ? this.props.submitButtonTitle
//         : 'I have an account'}
//     </button>
//   )}
//   <button
//     type='submit'
//     onClick={this.onSubmit}
//     style={defaultSubmitButtonStyle}
//   >
//     {this.props.signUpSubmitButtonTitle
//       ? this.props.signUpSubmitButtonTitle
//       : 'Continue'}
//   </button>
// </div>
// </div>

export default AuthenticationForm
