import React, { useRef, useState } from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import InfoMessage from '../InfoMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'
import { isValidEmail } from '../../utils.js'

export default function EmailPasswordAuthenticationFormForgotPassword(params) {
  const [isBusy, setIsBusy] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const emailInputRef = useRef()

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
    const templateName = 'reset_password'
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      emailInputRef.current.focus()
    } else {
      setIsBusy(true)
      params.feather
        .newCurrentCredential({ email, templateName })
        .then((credential) => {
          if (isMounted) {
            if (credential.status !== 'requires_verification')
              throw new Error('Something went wrong.')
            setIsBusy(false)
            setErrorMessage(null)
            params.setCurrentForm('verify_email')
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
        disabled={isBusy}
      />
      {errorMessage && (
        <ErrorMessage styles={params.styles} message={errorMessage} />
      )}
      <div>
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
        <button
          type='button'
          onClick={(e) => params.setCurrentForm('sign_in')}
          disabled={isBusy}
          className={css`
            ${params.styles.secondaryCtaButton}
          `}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
