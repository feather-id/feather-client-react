import React from 'react'
import EmailPasswordAuthenticationForm from '../EmailPasswordAuthenticationForm'
import EmailVerificationAuthenticationForm from '../EmailVerificationAuthenticationForm'
import ConfigWarning from '../ConfigWarning'

const validFactors = ['email_password', 'email_verification']

export default function AuthenticationForm(params) {
  const factors = params.factors ? params.factors : 'email_password'
  var warnings = []
  if (!validFactors.includes(factors)) {
    warnings.push(`The provided 'factors' parameter is invalid: '${factors}'.

    Please provide one of the following values:`)
    warnings = warnings.concat(validFactors.map((c) => ` - ${c}`))
  }
  return (
    <div>
      {warnings.length > 0 && <ConfigWarning warnings={warnings} />}
      {factors === 'email_password' && (
        <EmailPasswordAuthenticationForm
          feather={params.feather}
          styles={params.styles}
          silenceWarnings={params.silenceWarnings}
        />
      )}
      {factors === 'email_verification' && (
        <EmailVerificationAuthenticationForm
          feather={params.feather}
          styles={params.styles}
          redirectUrl={params.redirectUrl}
          silenceWarnings={params.silenceWarnings}
        />
      )}
    </div>
  )
}
