import React from 'react'
import EmailPasswordAuthenticationForm from '../EmailPasswordAuthenticationForm'
import EmailVerificationAuthenticationForm from '../EmailVerificationAuthenticationForm'
import ConfigWarning from '../ConfigWarning'
import { withFeather } from '../Context'

const validFactors = ['email_password', 'email_verification']

function AuthenticationForm(props) {
  const factors = props.factors ? props.factors : 'email_password'
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
          feather={props.feather}
          styles={props.styles}
          silenceWarnings={props.silenceWarnings}
        />
      )}
      {factors === 'email_verification' && (
        <EmailVerificationAuthenticationForm
          feather={props.feather}
          styles={props.styles}
          redirectUrl={props.redirectUrl}
          silenceWarnings={props.silenceWarnings}
        />
      )}
    </div>
  )
}

export default withFeather(AuthenticationForm)
