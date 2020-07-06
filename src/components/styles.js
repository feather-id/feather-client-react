export const defaultStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
    maxWidth: '448px',
    margin: 'auto',
    padding: '0px 32px',
    '@media(max-width: 512pt)': {
      padding: '0px 16px'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1'
  },
  title: {
    fontSize: '30px',
    color: 'hsl(214, 12%, 12%)',
    margin: '32px 4px',
    textAlign: 'left'
  },
  subtitle: {
    fontSize: '18px',
    color: 'hsl(214, 24%, 32%)',
    margin: '16px 4px 32px 4px',
    textAlign: 'left',
    lineHeight: '1.6'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    margin: '32px 0px 16px 0px',
    padding: '0px'
  },
  inputField: {
    WebkitAppearance: 'none',
    fontSize: '16px',
    padding: '0px 16px',
    height: '48px',
    border: '1px solid hsl(214, 36%, 84%)',
    color: 'hsl(214, 24%, 32%)',
    borderRadius: '0px',
    '::placeholder': {
      color: 'hsl(214, 36%, 84%)'
    }
  },
  inputTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: 'hsl(214, 24%, 32%)',
    textAlign: 'left',
    margin: '4px auto 12px 4px'
  },
  forgotPasswordButton: {
    fontSize: '16px',
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
    fontSize: '16px',
    margin: '36px 8px auto 0px',
    color: 'hsl(230, 75%, 65%)'
  },
  infoMessage: {
    fontSize: '16px',
    fontWeight: '500',
    margin: '32px 0px 0px 0px',
    textAlign: 'left',
    color: 'hsl(230, 75%, 65%)'
  },
  errorIcon: {
    fontSize: '16px',
    margin: '36px 8px auto 0px',
    color: 'hsl(356, 75%, 50%)'
  },
  errorMessage: {
    fontSize: '16px',
    fontWeight: '500',
    margin: '32px 0px 0px 0px',
    textAlign: 'left',
    color: 'hsl(356, 75%, 50%)'
  },
  primaryCtaButton: {
    fontSize: '16px',
    fontWeight: '500',
    border: 'none',
    color: '#fff',
    backgroundColor: 'hsl(230, 75%, 65%)',
    width: '100%',
    height: '48px',
    margin: '32px 0px 0px 0px',
    ':hover:enabled': {
      cursor: 'pointer',
      backgroundColor: 'hsl(230, 75%, 68%)'
    }
  },
  secondaryCtaButton: {
    fontSize: '16px',
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
