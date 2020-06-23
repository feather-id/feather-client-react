import React, { useState } from 'react'
import ConfigWarning from '../ConfigWarning'
import SignIn from './PasswordlessAuthenticationForm_SignIn.js'
import { css } from 'emotion'
import { defaultConfig } from './defaultConfig.js'
import { defaultStyles } from '../styles.js'
import { mergeStyles } from '../utils.js'

export default function PasswordlessAuthenticationForm(params) {
  const [emailInput, setEmailInput] = useState('')

  const onChangeInput = (event) => {
    event.preventDefault()
    setEmailInput(event.target.value)
  }

  const getConfigWarnings = (config) => {
    var configWarnings = []
    if (!params.feather) {
      configWarnings.push("You did not configure a 'feather' client.")
    }
    if (!params.redirectUrl) {
      configWarnings.push(
        "You did not include a 'redirectUrl'. This is the URL your users will be redirected to after clicking the link in a sign-in email."
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
  if (params.styles) {
    styles = mergeStyles(styles, params.styles)
  }

  return (
    <form
      className={css`
        ${styles.container}
      `}
    >
      {showConfigWarning && <ConfigWarning warnings={configWarnings} />}
      <SignIn
        feather={params.feather}
        form={config.signIn}
        onChangeInput={onChangeInput}
        redirectUrl={params.redirectUrl}
        styles={styles}
        input={{
          email: emailInput
        }}
      />
    </form>
  )
}
