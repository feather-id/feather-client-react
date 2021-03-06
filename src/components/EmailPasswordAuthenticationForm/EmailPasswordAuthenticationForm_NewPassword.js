import React, { useRef, useState } from 'react'
import FormInput from '../FormInput'
import ErrorMessage from '../ErrorMessage'
import InfoMessage from '../InfoMessage'
import Spinner from '../Spinner'
import { css } from 'emotion'

export default function EmailPasswordAuthenticationFormNewPassword(params) {
  const [inputType, setInputType] = useState('password')
  const [isBusy, setIsBusy] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const passwordRef = useRef()

  const onSubmit = (event) => {
    var isMounted = true
    event.preventDefault()
    if (!params.feather) {
      setErrorMessage(
        "A Feather client was not provided. To learn more about using Feather's React components, please see our documentation at https://feather.id/docs."
      )
      return
    } else if (newPassword === '') {
      setErrorMessage('Please enter a new password.')
      passwordInputRef.current.focus()
    } else {
      setIsBusy(true)
      params.feather
        .currentCredential()
        .then((credential) =>
          params.feather.passwords.update(newPassword, credential.token)
        )
        .then(() =>
          params.feather.newCurrentCredential({
            email: params.input.email,
            password: newPassword
          })
        )
        .then((credential) => params.feather.newCurrentUser(credential.token))
        .catch((error) => {
          if (isMounted) {
            setIsBusy(false)
            setErrorMessage(error.message)
          }
        })
    }
    return () => (isMounted = false)
  }

  const onChange = (event) => {
    event.preventDefault()
    setNewPassword(event.target.value)
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
        inputRef={passwordRef}
        type={inputType}
        name='passwordInput'
        title='New password'
        disabled={isBusy}
        helpButton={{
          title: inputType === 'password' ? 'Show' : 'Hide',
          onClick: (e) => {
            e.preventDefault()
            setInputType(inputType === 'password' ? 'text' : 'password')
          }
        }}
        value={newPassword}
        onChange={onChange}
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
        {isBusy ? <Spinner /> : 'Update password'}
      </button>
    </div>
  )
}
