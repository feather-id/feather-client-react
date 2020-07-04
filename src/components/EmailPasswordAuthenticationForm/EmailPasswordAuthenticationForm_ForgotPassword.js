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
  const [infoMessage, setInfoMessage] = useState(null)
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
    const templateName = 'reset_password'
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      emailInputRef.current.focus()
    } else if (!redirectUrl) {
      setErrorMessage('A redirect URL has not been configured.')
    } else {
      setIsBusy(true)
      params.feather
        .newCurrentCredential({ email, redirectUrl, templateName })
        .then((credential) => {
          if (credential.status !== 'requires_verification_code') {
            throw new Error('Something went wrong.')
          }
          setIsBusy(false)
          setInfoMessage(
            'Please check your email for a link to reset your password.'
          )
          setErrorMessage(null)
        })
        .catch((error) => {
          setIsBusy(true)
          setErrorMessage(error.message)
          setInfoMessage(null)
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
        title={inputs.email.title ? inputs.email.title : 'Email'}
        placeholder={inputs.email.placeholder}
        value={params.input.email}
        onChange={params.onChangeInput}
        styles={params.styles}
        disabled={isBusy}
      />
      {errorMessage && (
        <ErrorMessage styles={params.styles} message={errorMessage} />
      )}
      {infoMessage && (
        <InfoMessage styles={params.styles} message={infoMessage} />
      )}
      {!infoMessage && (
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
            name='sign_in'
            onClick={params.onClickFormTypeButton}
            disabled={isBusy}
            className={css`
              ${params.styles.secondaryCtaButton}
            `}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
