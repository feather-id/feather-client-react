import React from 'react'
import Feather from '../../feather'
import SignIn from './AuthenticationForm_SignIn.js'
import SignUp from './AuthenticationForm_SignUp.js'
import ForgotPassword from './AuthenticationForm_ForgotPassword.js'
import ComponentConfigWarning from './AuthenticationForm_ComponentConfigWarning.js'
import {
  defaultSignInForm,
  defaultSignUpForm,
  defaultForgotPasswordForm
} from './defaultForms.js'
import { defaultFormStyle } from '../styles.js'

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

  getConfigWarnings = () => {
    var configWarnings = []
    if (
      this.props.signInForm &&
      this.props.signInForm.inputs.hasOwnProperty('email') &&
      this.props.signInForm.inputs.hasOwnProperty('username')
    ) {
      configWarnings.push(
        'Your sign-in form has both an email and username field. You can reduce user friction by removing one of these fields.'
      )
    }

    if (
      this.props.signInForm &&
      this.props.signInForm.inputs.hasOwnProperty('username') &&
      !this.props.signInForm.inputs.hasOwnProperty('password')
    ) {
      configWarnings.push(
        'Your sign-in form has a username field without a password field.'
      )
    }

    if (
      this.props.signInForm &&
      this.props.signInForm.inputs.hasOwnProperty('username') &&
      !!this.props.signUpForm &&
      !this.props.signUpForm.inputs.hasOwnProperty('username')
    ) {
      configWarnings.push(
        'Your sign-in form has a username field, but your sign-up from does not.'
      )
    }

    if (
      this.props.signInForm &&
      this.props.signInForm.inputs.hasOwnProperty('email') &&
      !!this.props.signUpForm &&
      !this.props.signUpForm.inputs.hasOwnProperty('email')
    ) {
      configWarnings.push(
        'Your sign-in form has an email field, but your sign-up from does not.'
      )
    }

    if (
      this.props.signInForm &&
      this.props.signInForm.inputs.hasOwnProperty('password') &&
      !!this.props.signUpForm &&
      !this.props.signUpForm.inputs.hasOwnProperty('password')
    ) {
      configWarnings.push(
        'Your sign-in form has an password field, but your sign-up from does not.'
      )
    }

    if (
      this.props.signInForm &&
      !this.props.signInForm.inputs.hasOwnProperty('password') &&
      !this.props.verificationUrl
    ) {
      configWarnings.push(
        "Your sign-in form is passwordless, but you did not provide a 'verificationUrl'. This is the URL your user is redirected from the passwordless verification email."
      )
    }

    if (
      this.props.signInForm &&
      !this.props.signInForm.inputs.hasOwnProperty('password') &&
      !!this.props.signUpForm
    ) {
      configWarnings.push(
        'Your sign-in form is passwordless, but you additionally included a sign-up form. You can reduce user friction by removing the sign-up form.'
      )
    }

    if (!!this.props.forgotPasswordForm && !this.props.verificationUrl) {
      configWarnings.push(
        "You did not include a 'verificationUrl' for your forgot-password form. This is the URL your user is redirected from the password reset email."
      )
    }

    return configWarnings
  }

  render() {
    var signInFields = this.props.signInFields ? this.props.signInFields : []
    var signUpFields = this.props.signUpFields ? this.props.signUpFields : []

    // Test for warnings
    const configWarnings = this.getConfigWarnings()
    const showConfigWarning =
      configWarnings.length > 0 && !this.props.silenceWarnings

    var signInForm = this.props.signInForm
    var signUpForm = this.props.signUpForm
    var forgotPasswordForm = this.props.forgotPasswordForm
    if (!signInForm && !signUpForm && !forgotPasswordForm) {
      signInForm = defaultSignInForm
      signUpForm = defaultSignUpForm
      forgotPasswordForm = defaultForgotPasswordForm
    }

    return (
      <form style={defaultFormStyle}>
        {showConfigWarning && (
          <ComponentConfigWarning warnings={configWarnings} />
        )}
        {this.state.formType == 'sign_in' && (
          <SignIn
            form={signInForm}
            onSubmit={this.onSubmit}
            onChangeInput={this.onChangeInput}
            onClickFormTypeButton={this.onClickFormTypeButton}
            linkToSignUp={!!signUpForm}
            linkToForgotPassword={!!forgotPasswordForm}
            input={{
              email: this.state.emailInput,
              username: this.state.usernameInput,
              password: this.state.passwordInput
            }}
          />
        )}
        {this.state.formType == 'sign_up' && (
          <SignUp
            form={signUpForm}
            onSubmit={this.onSubmit}
            onChangeInput={this.onChangeInput}
            onClickFormTypeButton={this.onClickFormTypeButton}
            linkToSignIn={!!signInForm}
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
            form={forgotPasswordForm}
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
