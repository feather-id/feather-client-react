import React from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import InfoMessage from '../InfoMessage'
import { css } from 'emotion'
import { isValidEmail } from '../../utils.js'

const INITIAL_STATE = {
  errorMessage: null,
  infoMessage: null
}

class AuthenticationForm_ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (!this.props.feather) {
      console.error('Feather client not provided.')
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
    } else {
      this.setState({ errorMessage: null, infoMessage: null })
      this.props.feather
        .sendForgotPasswordLink(email, redirectUrl)
        .then(() => {
          this.setState({
            infoMessage:
              'Please check your email for a link to reset your password.'
          })
        })
        .catch((error) => {
          // Handle an error
          this.setState({ errorMessage: error.message })
        })
    }
  }

  render() {
    const inputs = this.props.form.inputs ? this.props.form.inputs : []
    return (
      <div>
        {this.props.form.title && (
          <p
            className={css`
              ${this.props.styles.title}
            `}
          >
            {this.props.form.title}
          </p>
        )}
        {this.props.form.subtitle && (
          <p
            className={css`
              ${this.props.styles.subtitle}
            `}
          >
            {this.props.form.subtitle}
          </p>
        )}
        <FormInput
          id='feather-id__password-authentication-form__forgot-password__email-input'
          type='email'
          name='emailInput'
          title={inputs.email.title ? inputs.email.title : 'Email'}
          placeholder={inputs.email.placeholder}
          value={this.props.input.email}
          onChange={this.props.onChangeInput}
          styles={this.props.styles}
        />
        {this.state.errorMessage && (
          <ErrorMessage
            styles={this.props.styles}
            message={this.state.errorMessage}
          />
        )}
        {this.state.infoMessage && (
          <InfoMessage
            styles={this.props.styles}
            message={this.state.infoMessage}
          />
        )}
        <div
          className={css`
            display: flex;
            flex-direction: row;
            width: 100%;
          `}
        >
          <button
            type='button'
            name='sign_in'
            onClick={this.props.onClickFormTypeButton}
            className={css`
              ${this.props.styles.secondaryCtaButton}
            `}
          >
            {this.props.form.secondaryCtaButtonTitle
              ? this.props.form.secondaryCtaButtonTitle
              : 'Cancel'}
          </button>
          <button
            type='submit'
            onClick={this.onSubmit}
            className={css`
              ${this.props.styles.primaryCtaButton}
            `}
          >
            {this.props.form.primaryCtaButtonTitle
              ? this.props.form.primaryCtaButtonTitle
              : 'Continue'}
          </button>
        </div>
      </div>
    )
  }
}

export default AuthenticationForm_ForgotPassword
