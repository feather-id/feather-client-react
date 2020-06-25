import React from 'react'
import EmailPasswordAuthenticationForm from '../EmailPasswordAuthenticationForm'
import EmailVerificationAuthenticationForm from '../EmailVerificationAuthenticationForm'
import ConfigWarning from '../ConfigWarning'

const validFactors = ['email_password', 'email_verification']

export default function AuthenticationForm(params) {
  var warnings = []
  if (!validFactors.includes(params.factors)) {
    warnings.push(`The provided 'factors' parameter is invalid: '${params.factors}'.

    Please provide one of the following values:`)
    warnings = warnings.concat(validFactors.map((c) => ` - ${c}`))
  }
  return (
    <div>
      {warnings.length > 0 && <ConfigWarning warnings={warnings} />}
      {params.factors === 'email_password' && (
        <EmailPasswordAuthenticationForm
          feather={params.feather}
          styles={params.styles}
          redirectUrl={params.redirectUrl}
          silenceWarnings={params.silenceWarnings}
        />
      )}
      {params.factors === 'email_verification' && (
        <EmailVerificationAuthenticationForm
          feather={params.feather}
          styles={params.styles}
          redirectUrl={prams.redirectUrl}
          silenceWarnings={params.silenceWarnings}
        />
      )}
    </div>
  )
}
