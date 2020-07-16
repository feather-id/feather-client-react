import React, { useRef, useState } from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'
import { isValidEmail } from '../../utils.js'

// TODO Custom checkboxes (e.g. for TOS/Privacy/etc.)

export default function EmailPasswordAuthenticationFormSignUp(params) {
  const [isBusy, setIsBusy] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const confirmPasswordInputRef = useRef()

  const onSubmit = (event) => {
    var isMounted = true
    event.preventDefault()
    if (!params.feather) {
      setErrorMessage(
        "A Feather client was not provided. To learn more about using Feather's React components, please see our documentation at https://feather.id/docs."
      )
      return
    }
    const email = params.input.email
    const password = params.input.password
    const confirmPassword = params.input.confirmPassword
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      emailInputRef.current.focus()
    } else if (password === '') {
      setErrorMessage('Please enter a password.')
      passwordInputRef.current.focus()
    } else if (password !== confirmPassword) {
      setErrorMessage('Your password and password confirmation do not match.')
      confirmPasswordInputRef.current.focus()
    } else {
      setIsBusy(true)
      params.feather
        .newCurrentCredential({ email, password })
        .then((credential) => {
          if (credential.status !== 'valid')
            throw new Error('Email address already registered.')
          return params.feather.newCurrentUser(credential.token)
        })
        .then((newUser) => {
          if (isMounted) {
            setIsBusy(false)
            setErrorMessage(null)
          }
        })
        .catch((error) => {
          if (isMounted) {
            setIsBusy(false)
            setErrorMessage(error.message)
          }
        })
    }
    return () => (isMounted = false)
  }

  return (
    <div>
      {params.form.title && (
        <p
          className={css`
            ${params.styles.title}
          `}
        >
          {params.form.title}
        </p>
      )}
      {params.form.subtitle && (
        <p
          className={css`
            ${params.styles.subtitle}
          `}
        >
          {params.form.subtitle}
        </p>
      )}
      <FormInput
        inputRef={emailInputRef}
        type='email'
        name='emailInput'
        title='Email'
        value={params.input.email}
        onChange={params.onChangeInput}
        styles={params.styles}
      />
      <FormInput
        inputRef={passwordInputRef}
        type='password'
        name='passwordInput'
        title='Password'
        value={params.input.password}
        onChange={params.onChangeInput}
        styles={params.styles}
        disabled={isBusy}
      />

      <FormInput
        inputRef={confirmPasswordInputRef}
        type='password'
        name='confirmPasswordInput'
        title='Confirm password'
        value={params.input.confirmPassword}
        onChange={params.onChangeInput}
        styles={params.styles}
        disabled={isBusy}
      />
      {errorMessage && (
        <ErrorMessage styles={params.styles} message={errorMessage} />
      )}
      <button
        type='submit'
        onClick={onSubmit}
        disabled={isBusy}
        className={css`
          ${params.styles.primaryCtaButton}
        `}
      >
        {isBusy ? <Spinner /> : 'Continue'}
      </button>
      {params.linkToSignIn && (
        <button
          type='button'
          disabled={isBusy}
          onClick={(e) => params.setCurrentForm('sign_in')}
          className={css`
            ${params.styles.secondaryCtaButton}
          `}
        >
          Already have an account?
        </button>
      )}
    </div>
  )
}
