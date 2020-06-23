export const defaultStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    maxWidth: '384px',
    padding: '64px 32px',
    margin: 'auto',
    background: 'none',
    '@media(max-width: 512pt)': {
      padding: '64px 24px'
    }
  },
  title: {
    fontSize: '1.5em',
    color: 'hsl(214, 12%, 12%)',
    margin: '32px 4px',
    textAlign: 'left'
  },
  subtitle: {
    fontSize: '1em',
    color: 'hsl(214, 24%, 32%)',
    margin: '16px 4px 32px 4px',
    textAlign: 'left',
    lineHeight: '1.6'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    margin: '0px 0px 32px 0px',
    padding: '0px'
  },
  inputField: {
    WebkitAppearance: 'none',
    fontSize: '1em',
    padding: '0px 16px',
    height: '48px',
    border: '1px solid hsl(214, 36%, 84%)',
    color: 'hsl(214, 24%, 32%)',
    borderRadius: '4px',
    '::placeholder': {
      color: 'hsl(214, 36%, 84%)'
    }
  },
  inputTitle: {
    fontSize: '1em',
    fontWeight: '500',
    color: 'hsl(214, 24%, 32%)',
    textAlign: 'left',
    margin: '4px auto 12px 4px'
  },
  forgotPasswordButton: {
    fontSize: '1em',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    color: 'hsl(230, 75%, 65%)',
    padding: '0px',
    margin: '0px 4px 8px auto',
    ':hover:enabled': {
      cursor: 'pointer',
      color: 'hsl(230, 75%, 68%)'
    }
  },
  infoIcon: {
    fontSize: '0.85em',
    margin: 'auto 8px auto 0px',
    color: 'hsl(230, 75%, 65%)'
  },
  infoMessage: {
    fontSize: '1em',
    fontWeight: '500',
    margin: '0px',
    textAlign: 'left',
    color: 'hsl(230, 75%, 65%)'
  },
  errorIcon: {
    fontSize: '0.85em',
    margin: 'auto 8px auto 0px',
    color: 'hsl(356, 75%, 50%)'
  },
  errorMessage: {
    fontSize: '1em',
    fontWeight: '500',
    margin: '0px',
    textAlign: 'left',
    color: 'hsl(356, 75%, 50%)'
  },
  primaryCtaButton: {
    fontSize: '1em',
    fontWeight: '500',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    backgroundColor: 'hsl(230, 75%, 65%)',
    width: '100%',
    height: '48px',
    margin: '32px 0px 16px 0px',
    ':hover:enabled': {
      cursor: 'pointer',
      backgroundColor: 'hsl(230, 75%, 68%)'
    }
  },
  secondaryCtaButton: {
    fontSize: '1em',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    color: 'hsl(230, 75%, 65%)',
    padding: '16px 0px',
    width: '100%',
    margin: '16px 0px',
    ':hover:enabled': {
      cursor: 'pointer',
      color: 'hsl(230, 75%, 68%)'
    }
  }
}

// Other styles

export const configWarningCSS = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  backgroundColor: '#f00',
  color: '#fff',
  padding: '16px'
}
