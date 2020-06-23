import React from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'
import { isValidEmail } from '../../utils.js'

// TODO Custom checkboxes (e.g. for TOS/Privacy/etc.)

const INITIAL_STATE = {
  isBusy: false,
  errorMessage: null
}

class AuthenticationForm_SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
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
    const password = this.props.input.password
    const confirmPassword = this.props.input.confirmPassword
    if (!isValidEmail(email)) {
      this.setState({ errorMessage: 'Please enter a valid email address.' })
      this.emailInput = window.document
        .getElementById(
          'feather-id__password-authentication-form__sign-up__email-input'
        )
        .focus()
    } else if (password === '') {
      this.setState({ errorMessage: 'Please enter a password.' })
      this.emailInput = window.document
        .getElementById(
          'feather-id__password-authentication-form__sign-up__password-input'
        )
        .focus()
    } else if (password !== confirmPassword) {
      this.setState({
        errorMessage: 'Your password and password confirmation do not match.'
      })
      this.emailInput = window.document
        .getElementById(
          'feather-id__password-authentication-form__sign-up__confirm-password-input'
        )
        .focus()
    } else {
      this.setState({ isBusy: true })

      // TODO
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
          id='feather-id__password-authentication-form__sign-up__email-input'
          type='email'
          name='emailInput'
          title={inputs.email.title ? inputs.email.title : 'Email'}
          placeholder={inputs.email.placeholder}
          value={this.props.input.email}
          onChange={this.props.onChangeInput}
          styles={this.props.styles}
        />
        <FormInput
          id='feather-id__password-authentication-form__sign-up__password-input'
          type='password'
          name='passwordInput'
          title={inputs.password.title ? inputs.password.title : 'Password'}
          placeholder={inputs.password.placeholder}
          value={this.props.input.password}
          onChange={this.props.onChangeInput}
          styles={this.props.styles}
          disabled={this.state.isBusy}
        />

        <FormInput
          id='feather-id__password-authentication-form__sign-up__confirm-password-input'
          type='password'
          name='confirmPasswordInput'
          title={
            inputs.confirmPassword.title
              ? inputs.confirmPassword.title
              : 'Confirm password'
          }
          placeholder={inputs.confirmPassword.placeholder}
          value={this.props.input.confirmPassword}
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
        {this.props.linkToSignIn && (
          <button
            type='button'
            name='sign_in'
            disabled={this.state.isBusy}
            onClick={this.props.onClickFormTypeButton}
            className={css`
              ${this.props.styles.secondaryCtaButton}
            `}
          >
            Already have an account?
          </button>
        )}
      </div>
    )
  }
}

export default AuthenticationForm_SignUp
