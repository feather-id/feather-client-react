import React from 'react'
import SignIn from './PasswordAuthenticationForm_SignIn.js'
import SignUp from './PasswordAuthenticationForm_SignUp.js'
import ForgotPassword from './PasswordAuthenticationForm_ForgotPassword.js'
import ConfigWarning from '../ConfigWarning'
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

  getConfigWarnings = (config) => {
    var configWarnings = []
    if (!this.props.redirectUrl) {
      configWarnings.push(
        "You did not include a 'redirectUrl' for the forgot-password form. This is the URL your users will be redirected to after click the link in a password reset email."
      )
    }
    return configWarnings
  }

  render() {
    var signInFields = this.props.signInFields ? this.props.signInFields : []
    var signUpFields = this.props.signUpFields ? this.props.signUpFields : []

    // Get configuration warnings
    // const config = this.props.config ? this.props.config : defaultConfig
    const config = defaultConfig
    const configWarnings = this.getConfigWarnings(config)
    const showConfigWarning =
      configWarnings.length > 0 && !this.props.silenceWarnings

    // Merge in custom styling
    var styles = { ...defaultStyles }
    if (!!this.props.styles) {
      styles = mergeStyles(styles, this.props.styles)
    }
    //

    return (
      <form
        className={css`
          ${styles.container}
        `}
      >
        {showConfigWarning && <ConfigWarning warnings={configWarnings} />}
        {this.state.formType == 'sign_in' && (
          <SignIn
            feather={this.props.feather}
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
            feather={this.props.feather}
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
            feather={this.props.feather}
            form={config.forgotPassword}
            onSubmit={this.onSubmitForgotPassword}
            onChangeInput={this.onChangeInput}
            onClickFormTypeButton={this.onClickFormTypeButton}
            redirectUrl={this.props.redirectUrl}
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
