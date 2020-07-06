import React, { useState } from 'react'
import SignIn from './EmailPasswordAuthenticationForm_SignIn.js'
import SignUp from './EmailPasswordAuthenticationForm_SignUp.js'
import ForgotPassword from './EmailPasswordAuthenticationForm_ForgotPassword.js'
import VerifyEmail from './EmailPasswordAuthenticationForm_VerifyEmail.js'
import NewPassword from './EmailPasswordAuthenticationForm_NewPassword.js'
import ConfigWarning from '../ConfigWarning'
import { css } from 'emotion'
import { defaultConfig } from './defaultConfig.js'
import { defaultStyles } from '../styles.js'
import { mergeStyles } from '../utils.js'

export default function EmailPasswordAuthenticationForm(params) {
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

  const getConfigWarnings = (config) => {
    var configWarnings = []
    if (!params.feather) {
      configWarnings.push("You did not configure a 'feather' client.")
    }
    return configWarnings
  }

  // Get configuration warnings
  const config = defaultConfig
  const configWarnings = getConfigWarnings(config)
  const showConfigWarning = configWarnings.length > 0 && !params.silenceWarnings

  // Merge in custom styling
  var styles = { ...defaultStyles }
  if (params.styles) {
    styles = mergeStyles(styles, params.styles)
  }

  return (
    <div
      className={css`
        ${styles.wrapper}
      `}
    >
      <form
        className={css`
          ${styles.container}
        `}
      >
        {showConfigWarning && <ConfigWarning warnings={configWarnings} />}
        {currentForm === 'sign_in' && (
          <SignIn
            feather={params.feather}
            form={config.signIn}
            onChangeInput={onChangeInput}
            setCurrentForm={setCurrentForm}
            linkToSignUp={!!config.signUp}
            linkToForgotPassword={!!config.forgotPassword}
            styles={styles}
            input={{
              email: emailInput,
              password: passwordInput
            }}
          />
        )}
        {currentForm === 'sign_up' && (
          <SignUp
            feather={params.feather}
            form={config.signUp}
            onChangeInput={onChangeInput}
            setCurrentForm={setCurrentForm}
            linkToSignIn={!!config.signIn}
            styles={styles}
            input={{
              email: emailInput,
              password: passwordInput,
              confirmPassword: confirmPasswordInput
            }}
          />
        )}
        {currentForm === 'forgot_password' && (
          <ForgotPassword
            feather={params.feather}
            form={config.forgotPassword}
            onChangeInput={onChangeInput}
            setCurrentForm={setCurrentForm}
            styles={styles}
            input={{
              email: emailInput
            }}
          />
        )}
        {currentForm === 'verify_email' && (
          <VerifyEmail
            feather={params.feather}
            form={config.verifyEmail}
            setCurrentForm={setCurrentForm}
            styles={styles}
          />
        )}
        {currentForm === 'new_password' && (
          <NewPassword
            feather={params.feather}
            form={config.newPassword}
            setCurrentForm={setCurrentForm}
            styles={styles}
            input={{
              email: emailInput
            }}
          />
        )}
      </form>
    </div>
  )
}
