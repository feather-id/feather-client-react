import React, { useRef, useState } from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'
import { isValidEmail } from '../../utils.js'

export default function EmailPasswordAuthenticationFormSignIn(params) {
  const [isBusy, setIsBusy] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const onSubmit = (event) => {
    event.preventDefault()
    if (!params.feather) {
      setErrorMessage(
        "A Feather client was not provided. To learn more about using Feather's React components, please see our documentation at https://feather.id/docs."
      )
      return
    }
    const email = params.input.email
    const password = params.input.password
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      emailInputRef.current.focus()
    } else if (password === '') {
      setErrorMessage('Please enter a password.')
      passwordInputRef.current.focus()
    } else {
      setIsBusy(true)
      params.feather
        .signIn(email, password)
        .then(() => {
          setIsBusy(false)
          setErrorMessage(null)
        })
        .catch((error) => {
          setIsBusy(false)
          setErrorMessage(error.message)
        })
    }
  }

  const inputs = params.form.inputs ? params.form.inputs : []
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
        placeholder={inputs.email.placeholder}
        value={params.input.email}
        onChange={params.onChangeInput}
        styles={params.styles}
        disabled={isBusy}
      />
      <FormInput
        inputRef={passwordInputRef}
        type='password'
        name='passwordInput'
        title='Password'
        placeholder={inputs.password.placeholder}
        disabled={isBusy}
        helpButton={
          params.linkToForgotPassword && {
            title: 'Forgot password?',
            onClick: params.onClickFormTypeButton,
            name: 'forgot_password'
          }
        }
        value={params.input.password}
        onChange={params.onChangeInput}
        styles={params.styles}
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
      {params.linkToSignUp && (
        <button
          type='button'
          name='sign_up'
          onClick={params.onClickFormTypeButton}
          disabled={isBusy}
          className={css`
            ${params.styles.secondaryCtaButton}
          `}
        >
          Create an account
        </button>
      )}
    </div>
  )
}
