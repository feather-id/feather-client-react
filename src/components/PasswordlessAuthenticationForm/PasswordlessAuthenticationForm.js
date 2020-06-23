import React from 'react'
import ConfigWarning from '../ConfigWarning'
import PasswordlessAuthenticationForm_SignIn from './PasswordlessAuthenticationForm_SignIn.js'
import { css } from 'emotion'
import { defaultConfig } from './defaultConfig.js'
import { defaultStyles } from '../styles.js'
import { mergeStyles } from '../utils.js'

const INITIAL_STATE = {
  isBusy: false,
  emailInput: ''
}

class PasswordlessAuthenticationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onChangeInput = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (!this.props.feather) {
      this.setState({
        errorMessage:
          "A Feather client was not provided. To learn more about using Feather's React components, please see our documentation at https://feather.id/docs."
      })
      return
    }
    const email = this.props.input.email
    const redirectUrl = this.props.redirectUrl
    if (!isValidEmail(email)) {
      this.setState({ errorMessage: 'Please enter a valid email address.' })
      this.emailInput = window.document
        .getElementById(
          'feather-id__password-authentication-form__forgot-password__email-input'
        )
        .focus()
    } else if (!redirectUrl) {
      this.setState({
        errorMessage: 'A redirect URL has not been configured.'
      })
    } else {
      this.setState({ isBusy: true })
      this.props.feather
        .sendSignInLink(email, redirectUrl)
        .then(() => {
          this.setState({
            isBusy: false,
            infoMessage:
              'Please check your email for a link to reset your password.',
            errorMessage: null
          })
        })
        .catch((error) => {
          this.setState({
            isBusy: true,
            errorMessage: error.message,
            infoMessage: null
          })
        })
    }
  }

  getConfigWarnings = (config) => {
    var configWarnings = []
    if (!this.props.feather) {
      configWarnings.push("You did not configure a 'feather' client.")
    }
    if (!this.props.redirectUrl) {
      configWarnings.push(
        "You did not include a 'redirectUrl'. This is the URL your users will be redirected to after clicking the link in a sign-in email."
      )
    }
    return configWarnings
  }

  render() {
    // Get configuration warnings
    const config = defaultConfig
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
        {showConfigWarning && <ConfigWarning warnings={configWarnings} />}
        <PasswordlessAuthenticationForm_SignIn
          feather={this.props.feather}
          form={config.signIn}
          onSubmit={this.onSubmitSignIn}
          onChangeInput={this.onChangeInput}
          onClickFormTypeButton={this.onClickFormTypeButton}
          redirectUrl={this.props.redirectUrl}
          styles={styles}
          input={{
            email: this.state.emailInput
          }}
        />
      </form>
    )
  }
}

export { PasswordlessAuthenticationForm }
