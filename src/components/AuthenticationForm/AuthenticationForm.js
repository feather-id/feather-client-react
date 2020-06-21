import React from 'react'
// import Feather from '../../feather'
import SignIn from './AuthenticationForm_SignIn.js'
import SignUp from './AuthenticationForm_SignUp.js'
import ForgotPassword from './AuthenticationForm_ForgotPassword.js'
import ComponentConfigWarning from './AuthenticationForm_ComponentConfigWarning.js'
import { css } from 'emotion'
import { defaultConfig } from './defaultConfig.js'
import { defaultStyles } from '../styles.js'
import { mergeStyles } from './utils.js'

const INITIAL_STATE = {
  emailInput: '',
  passwordInput: '',
  confirmPasswordInput: '',
  formType: 'sign_in'
}

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props)

    // TODO smartly choose the initial formType

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

  onSubmitSignIn = (event) => {
    event.preventDefault()
    if (!this.props.feather) {
      // TODO throw error
      console.error('Feather client not provided.')
      return
    }
    const email = this.state.emailInput
    const password = this.state.passwordInput
    this.props.feather.signIn({ email, password }).catch((error) => {
      // Handle an error
      console.log(error)
    })
  }

  getConfigWarnings = (config) => {
    var configWarnings = []

    if (
      config.signIn &&
      config.signIn.inputs.hasOwnProperty('email') &&
      !!config.signUp &&
      !config.signUp.inputs.hasOwnProperty('email')
    ) {
      configWarnings.push(
        'Your sign-in form has an email field, but your sign-up from does not.'
      )
    }

    if (
      config.signIn &&
      config.signIn.inputs.hasOwnProperty('password') &&
      !!config.signUp &&
      !config.signUp.inputs.hasOwnProperty('password')
    ) {
      configWarnings.push(
        'Your sign-in form has an password field, but your sign-up from does not.'
      )
    }

    if (
      config.signIn &&
      !config.signIn.inputs.hasOwnProperty('password') &&
      !this.props.redirectUrl
    ) {
      configWarnings.push(
        "Your sign-in form is passwordless, but you did not provide a 'redirectUrl'. This is the URL your user is redirected from the passwordless verification email."
      )
    }

    if (
      config.signIn &&
      !config.signIn.inputs.hasOwnProperty('password') &&
      !!config.signUp
    ) {
      configWarnings.push(
        'Your sign-in form is passwordless, but you additionally included a sign-up form. You can reduce user friction by removing the sign-up form.'
      )
    }

    if (!!config.forgotPassword && !this.props.redirectUrl) {
      configWarnings.push(
        "You did not include a 'redirectUrl' for your forgot-password form. This is the URL your user is redirected from the password reset email."
      )
    }

    return configWarnings
  }

  render() {
    var signInFields = this.props.signInFields ? this.props.signInFields : []
    var signUpFields = this.props.signUpFields ? this.props.signUpFields : []

    // Get configuration warnings
    const config = this.props.config ? this.props.config : defaultConfig
    const configWarnings = this.getConfigWarnings(config)
    const showConfigWarning =
      configWarnings.length > 0 && !this.props.silenceWarnings

    // Merge in custom styling
    var styles = { ...defaultStyles }
    if (!!this.props.styles) {
      styles = mergeStyles(styles, this.props.styles)
    }

    return (
      <form
        className={css`
          ${styles.container}
        `}
      >
        {showConfigWarning && (
          <ComponentConfigWarning warnings={configWarnings} />
        )}
        {this.state.formType == 'sign_in' && (
          <SignIn
            form={config.signIn}
            onSubmit={this.onSubmitSignIn}
            onChangeInput={this.onChangeInput}
            onClickFormTypeButton={this.onClickFormTypeButton}
            linkToSignUp={!!config.signUp}
            linkToForgotPassword={!!config.forgotPassword}
            styles={styles}
            input={{
              email: this.state.emailInput,
              password: this.state.passwordInput
            }}
          />
        )}
        {this.state.formType == 'sign_up' && (
          <SignUp
            form={config.signUp}
            onSubmit={this.onSubmitSignUp}
            onChangeInput={this.onChangeInput}
            onClickFormTypeButton={this.onClickFormTypeButton}
            linkToSignIn={!!config.signIn}
            styles={styles}
            input={{
              email: this.state.emailInput,
              password: this.state.passwordInput,
              confirmPassword: this.state.confirmPasswordInput
            }}
          />
        )}
        {this.state.formType == 'forgot_password' && (
          <ForgotPassword
            form={config.forgotPassword}
            onSubmit={this.onSubmitForgotPassword}
            onChangeInput={this.onChangeInput}
            onClickFormTypeButton={this.onClickFormTypeButton}
            styles={styles}
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
