import React, { useRef, useState } from 'react'
import VerificationCodeInput from '../VerificationCodeInput'
import ErrorMessage from '../ErrorMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'

export default function EmailPasswordAuthenticationFormVerifyEmail(params) {
  const [isBusy, setIsBusy] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const onSubmit = (verificationCode) => {
    if (!params.feather) {
      setErrorMessage(
        "A Feather client was not provided. To learn more about using Feather's React components, please see our documentation at https://feather.id/docs."
      )
      return
    }
    if (verificationCode.length !== 6) {
      // TODO
      return
    }
    setIsBusy(true)
    params.feather
      .currentCredential()
      .then((credential) => credential.update({ verificationCode }))
      .then((credential) => {
        setIsBusy(false)
        if (credential.status === 'valid') {
          params.setCurrentForm('new_password')
        } else {
          setErrorMessage(
            'Something went wrong. We were not able to verify ownership of your email address.'
          )
        }
      })
      .catch((error) => {
        setIsBusy(false)
        setErrorMessage(error.message)
      })
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
      <VerificationCodeInput styles={params.styles} onSubmit={onSubmit} />
      {errorMessage && (
        <ErrorMessage styles={params.styles} message={errorMessage} />
      )}
      <div>{isBusy && <Spinner />}</div>
    </div>
  )
}
