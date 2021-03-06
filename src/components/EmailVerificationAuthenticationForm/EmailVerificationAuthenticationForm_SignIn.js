import React, { useRef, useState } from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import InfoMessage from '../InfoMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'
import { isValidEmail } from '../../utils.js'

export default function EmailVerificationAuthenticationFormSignIn(params) {
  const [isBusy, setIsBusy] = useState()
  const [didSentLink, setDidSentLink] = useState(false)
  const [infoMessage, setInfoMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
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
    const redirectUrl = params.redirectUrl
    const templateName = 'sign_in'
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      emailInputRef.current.focus()
    } else {
      setIsBusy(true)
      params.feather
        .newCurrentCredential({ email, redirectUrl, templateName })
        .then((credential) => {
          if (isMounted) {
            if (credential.status !== 'requires_verification')
              throw new Error('Something went wrong.')
            setIsBusy(false)
            setDidSentLink(true)
            setInfoMessage('Please check your email for a link to sign in.')
            setErrorMessage(null)
          }
        })
        .catch((error) => {
          if (isMounted) {
            setIsBusy(false)
            setErrorMessage(error.message)
            setInfoMessage(null)
          }
        })
    }
    return () => (isMounted = true)
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
      {!didSentLink && (
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
      )}
    </div>
  )
}
