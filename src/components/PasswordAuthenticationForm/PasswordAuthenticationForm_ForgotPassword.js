import React from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import InfoMessage from '../InfoMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'
import { isValidEmail } from '../../utils.js'

const INITIAL_STATE = {
  isBusy: false,
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
      this.setState({ isBusy: true })
      this.props.feather
        .sendForgotPasswordLink(email, redirectUrl)
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
          disabled={this.state.isBusy}
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
        {!this.state.infoMessage && (
          <div>
            <button
              type='submit'
              onClick={this.onSubmit}
              disabled={this.state.isBusy}
              className={css`
                ${this.props.styles.primaryCtaButton}
              `}
            >
              {this.state.isBusy ? <Spinner /> : 'Continue'}
            </button>
            <button
              type='button'
              name='sign_in'
              onClick={this.props.onClickFormTypeButton}
              disabled={this.state.isBusy}
              className={css`
                ${this.props.styles.secondaryCtaButton}
              `}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default AuthenticationForm_ForgotPassword
