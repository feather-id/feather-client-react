import React, { useRef, useState } from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import InfoMessage from '../InfoMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'
import { isValidEmail } from '../../utils.js'

export default function PasswordlessAuthenticationFormSignIn(params) {
  const [isBusy, setIsBusy] = useState()
  const [infoMessage, setInfoMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const emailInputRef = useRef()

  const onSubmit = (event) => {
    event.preventDefault()
    if (!params.feather) {
      setErrorMessage(
        "A Feather client was not provided. To learn more about using Feather's React components, please see our documentation at https://feather.id/docs."
      )
      return
    }

    const email = params.input.email
    const redirectUrl = params.redirectUrl
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      emailInputRef.current.focus()
    } else {
      setIsBusy(true)
      params.feather
        .sendSignInLink(email, redirectUrl)
        .then(() => {
          setIsBusy(false)
          setInfoMessage(
            'Please check your email for a link to reset your password.'
          )
          setErrorMessage(null)
        })
        .catch((error) => {
          setIsBusy(false)
          setInfoMessage(null)
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
      {infoMessage && (
        <InfoMessage styles={params.styles} message={infoMessage} />
      )}
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
    </div>
  )
}
