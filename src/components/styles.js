// export const defaultFormCSS =
// export const defaultTitleCSS =
// export const defaultInputCSS =
// export const defaultInputFieldCSS =
// export const defaultInputTitleCSS =
// export const defaultForgotPasswordButtonCSS =
// export const defaultSubmitButtonCSS =
// export const defaultFormStyleButton =

export const defaultStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '512px',
    padding: '64px 32px',
    margin: 'auto'
  },
  title: {
    fontSize: '1.64em',
    color: 'hsl(214, 12%, 12%)',
    margin: '32px 4px',
    textAlign: 'left'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    margin: '0px 0px 32px 0px',
    padding: '0px'
  },
  inputField: {
    fontSize: '1.2em',
    padding: '16px',
    border: '1px solid hsl(214, 36%, 84%)',
    color: 'hsl(214, 24%, 32%)',
    borderRadius: '4px',
    '::placeholder': {
      color: 'hsl(214, 36%, 84%)'
    }
  },
  inputTitle: {
    fontSize: '1.2em',
    color: 'hsl(214, 24%, 32%)',
    textAlign: 'left',
    margin: '4px auto 8px 4px'
  },
  forgotPasswordButton: {
    fontSize: '1em',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    color: 'hsl(230, 75%, 65%)',
    padding: '0px',
    margin: '0px 4px 0px auto',
    cursor: 'pointer'
  },
  primaryCtaButton: {
    fontSize: '1.2em',
    fontWeight: '500',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    background: 'hsl(230, 75%, 65%)',
    padding: '16px 32px',
    margin: '16px 0px 0px auto',
    cursor: 'pointer'
  },
  secondaryCtaButton: {
    fontSize: '1.2em',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    color: 'hsl(230, 75%, 65%)',
    padding: '16px 0px',
    margin: '16px auto 0px 0px',
    cursor: 'pointer'
  }
}

// Other styles

export const configWarningCSS = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  background: '#f00',
  color: '#fff',
  padding: '16px'
}
