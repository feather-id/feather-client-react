import React from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'
import { isValidEmail } from '../../utils.js'

const INITIAL_STATE = {
  isBusy: false,
  errorMessage: null
}

class AuthenticationForm_SignIn extends React.Component {
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
    const password = this.props.input.password
    if (!isValidEmail(email)) {
      this.setState({ errorMessage: 'Please enter a valid email address.' })
      this.emailInput = window.document
        .getElementById(
          'feather-id__password-authentication-form__sign-in__email-input'
        )
        .focus()
    } else if (password === '') {
      this.setState({ errorMessage: 'Please enter a password.' })
      this.emailInput = window.document
        .getElementById(
          'feather-id__password-authentication-form__sign-in__password-input'
        )
        .focus()
    } else {
      this.setState({ isBusy: true })
      this.props.feather
        .signIn(email, password)
        .then(() => {
          this.setState({ isBusy: false, errorMessage: null })
        })
        .catch((error) => {
          this.setState({ isBusy: false, errorMessage: error.message })
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
          id='feather-id__password-authentication-form__sign-in__email-input'
          type='email'
          name='emailInput'
          title={inputs.email.title ? inputs.email.title : 'Email'}
          placeholder={inputs.email.placeholder}
          value={this.props.input.email}
          onChange={this.props.onChangeInput}
          styles={this.props.styles}
          disabled={this.state.isBusy}
        />
        <FormInput
          id='feather-id__password-authentication-form__sign-in__password-input'
          type='password'
          name='passwordInput'
          title={inputs.password.title ? inputs.password.title : 'Password'}
          placeholder={inputs.password.placeholder}
          disabled={this.state.isBusy}
          helpButton={
            this.props.linkToForgotPassword && {
              title: inputs.password.forgotPasswordButtonTitle
                ? inputs.password.forgotPasswordButtonTitle
                : 'Forgot password?',
              onClick: this.props.onClickFormTypeButton,
              name: 'forgot_password'
            }
          }
          value={this.props.input.password}
          onChange={this.props.onChangeInput}
          styles={this.props.styles}
        />
        {this.state.errorMessage && (
          <ErrorMessage
            styles={this.props.styles}
            message={this.state.errorMessage}
          />
        )}
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
        {this.props.linkToSignUp && (
          <button
            type='button'
            name='sign_up'
            onClick={this.props.onClickFormTypeButton}
            disabled={this.state.isBusy}
            className={css`
              ${this.props.styles.secondaryCtaButton}
            `}
          >
            Create an account
          </button>
        )}
      </div>
    )
  }
}

export default AuthenticationForm_SignIn
