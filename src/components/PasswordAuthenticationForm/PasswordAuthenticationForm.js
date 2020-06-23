import React, { useState } from 'react'
import SignIn from './PasswordAuthenticationForm_SignIn.js'
import SignUp from './PasswordAuthenticationForm_SignUp.js'
import ForgotPassword from './PasswordAuthenticationForm_ForgotPassword.js'
import ConfigWarning from '../ConfigWarning'
import { css } from 'emotion'
import { defaultConfig } from './defaultConfig.js'
import { defaultStyles } from '../styles.js'
import { mergeStyles } from '../utils.js'

const INITIAL_STATE = {
  emailInput: '',
  passwordInput: '',
  confirmPasswordInput: '',
  formType: 'sign_in'
}

export default function PasswordAuthenticationForm(params) {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')
  const [currentForm, setCurrentForm] = useState('sign_in')

  const onChangeInput = (event) => {
    event.preventDefault()
    switch (event.target.name) {
      case 'emailInput':
        setEmailInput(event.target.value)
        break
      case 'passwordInput':
        setPasswordInput(event.target.value)
        break
      case 'confirmPasswordInput':
        setConfirmPasswordInput(event.target.value)
        break
      default:
        break
    }
  }

  const onClickFormTypeButton = (event) => {
    event.preventDefault()
    setCurrentForm(event.target.name)
  }

  const getConfigWarnings = (config) => {
    var configWarnings = []
    if (!params.feather) {
      configWarnings.push("You did not configure a 'feather' client.")
    }
    if (!params.redirectUrl) {
      configWarnings.push(
        "You did not configure a 'redirectUrl' for the forgot-password form. This is the URL your users will be redirected to after clicking the link in a password reset email."
      )
    }
    return configWarnings
  }

  // Get configuration warnings
  const config = defaultConfig
  const configWarnings = getConfigWarnings(config)
  const showConfigWarning = configWarnings.length > 0 && !params.silenceWarnings

  // Merge in custom styling
  var styles = { ...defaultStyles }
  if (!!params.styles) {
    styles = mergeStyles(styles, params.styles)
  }

  return (
    <form
      className={css`
        ${styles.container}
      `}
    >
      {showConfigWarning && <ConfigWarning warnings={configWarnings} />}
      {currentForm == 'sign_in' && (
        <SignIn
          feather={params.feather}
          form={config.signIn}
          onChangeInput={onChangeInput}
          onClickFormTypeButton={onClickFormTypeButton}
          linkToSignUp={!!config.signUp}
          linkToForgotPassword={!!config.forgotPassword}
          styles={styles}
          input={{
            email: emailInput,
            password: passwordInput
          }}
        />
      )}
      {currentForm == 'sign_up' && (
        <SignUp
          feather={params.feather}
          form={config.signUp}
          onChangeInput={onChangeInput}
          onClickFormTypeButton={onClickFormTypeButton}
          linkToSignIn={!!config.signIn}
          styles={styles}
          input={{
            email: emailInput,
            password: passwordInput,
            confirmPassword: confirmPasswordInput
          }}
        />
      )}
      {currentForm == 'forgot_password' && (
        <ForgotPassword
          feather={params.feather}
          form={config.forgotPassword}
          onChangeInput={onChangeInput}
          onClickFormTypeButton={onClickFormTypeButton}
          redirectUrl={params.redirectUrl}
          styles={styles}
          input={{
            email: emailInput
          }}
        />
      )}
    </form>
  )
}
