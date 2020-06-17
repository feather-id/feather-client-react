import React from 'react'
import Feather from '../../feather'
import SignIn from './AuthenticationForm_SignIn.js'
import SignUp from './AuthenticationForm_SignUp.js'
import ForgotPassword from './AuthenticationForm_ForgotPassword.js'
import { defaultFormStyle } from '../styles.js'

const INITIAL_STATE = {
  emailInput: '',
  usernameInput: '',
  passwordInput: '',
  confirmPasswordInput: '',
  formType: 'sign_in',
  componentConfigurationError: null
}

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props)

    // TODO smartly choose the formType

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

export default AuthenticationForm
