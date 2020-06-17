import React from 'react'
import Feather from '../../feather'

const INITIAL_STATE = {
  emailInput: '',
  usernameInput: '',
  passwordInput: '',
  passwordConfirmationInput: '',
  formType: 'sign_in'
}

const defaultFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '512px',
  padding: '64px 32px',
  margin: 'auto'
}

const defaultTitleStyle = {
  fontSize: '1.64em',
  color: 'hsl(214, 12%, 12%)',
  margin: '32px 4px',
  textAlign: 'left'
}

const defaultInputStyle = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  margin: '0px 0px 32px 0px',
  padding: '0px'
}

const defaultInputFieldStyle = {
  fontSize: '1.5em',
  padding: '16px',
  border: '1px solid hsl(214, 36%, 84%)',
  color: 'hsl(214, 24%, 32%)',
  borderRadius: '4px'
}

const defaultInputTitleStyle = {
  fontSize: '1.2em',
  color: 'hsl(214, 24%, 32%)',
  textAlign: 'left',
  margin: '4px auto 8px 4px'
}

const defaultForgotPasswordButtonStyle = {
  fontSize: '1em',
  fontWeight: '500',
  background: 'none',
  border: 'none',
  color: 'hsl(230, 75%, 65%)',
  padding: '0px',
  margin: '0px 4px 0px auto',
  cursor: 'pointer'
}

const defaultFormStyleButton = {
  fontSize: '1.2em',
  fontWeight: '500',
  background: 'none',
  border: 'none',
  color: 'hsl(230, 75%, 65%)',
  padding: '16px 0px',
  margin: '16px auto 0px 0px',
  cursor: 'pointer'
}

const defaultSubmitButtonStyle = {
  fontSize: '1.2em',
  fontWeight: '500',
  borderRadius: '4px',
  border: 'none',
  color: '#fff',
  background: 'hsl(230, 75%, 65%)',
  padding: '16px 32px',
  margin: '16px 0px 0px auto',
  cursor: 'pointer'
}

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onChangeInput = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  onClickFormTypeButton = (event) => {
    event.preventDefault()
    this.setState({ formType: [event.target.name] })
    // switch (this.state.formType) {
    //   case 'sign_in':
    //
    //     break
    //
    //   case 'sign_up':
    //     this.setState({ formType: 'sign_in' })
    //     break
    //
    //   default:
    //     break
    // }
  }

  onSubmit = (event) => {
    event.preventDefault()

    // TODO
    const apiKey = 'live_ZkPKKTbXR2MkJ0RIiueGVWGZA9yBJM'
    const config = { host: 'localhost', port: '8080', protocol: 'http' }
    const client = Feather(apiKey, config)
    client.credentials
      .create({
        type: 'email|password',
        email: this.state.emailInput,
        password: this.state.passwordInput
      })
      .then((credential) => {
        // A new credential
        console.log(credential)
      })
      .catch((error) => {
        // Handle an error
        console.log(error)
      })
  }

  render() {
    var signInFields = this.props.signInFields
    var signUpFields = this.props.signUpFields
    if (!signInFields) {
      signInFields = []
    }
    if (!signUpFields) {
      signUpFields = []
    }
    return (
      <form style={defaultFormStyle}>
        {this.state.formType == 'sign_in' && (
          <div>
            {this.props.signInTitle && (
              <p style={defaultTitleStyle}>{this.props.signInTitle}</p>
            )}
            {signInFields.includes('username') && (
              <div style={defaultInputStyle}>
                <p style={defaultInputTitleStyle}>Username</p>
                <input
                  type='text'
                  name='usernameInput'
                  onChange={this.onChangeInput}
                  value={this.state.usernameInput}
                  style={defaultInputFieldStyle}
                />
              </div>
            )}
            {signInFields.includes('email') && (
              <div style={defaultInputStyle}>
                <p style={defaultInputTitleStyle}>Email</p>
                <input
                  type='email'
                  name='emailInput'
                  onChange={this.onChangeInput}
                  value={this.state.emailInput}
                  style={defaultInputFieldStyle}
                />
              </div>
            )}
            {signInFields.includes('password') && (
              <div style={defaultInputStyle}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                >
                  <p style={defaultInputTitleStyle}>Password</p>
                  <button
                    type='submit'
                    name='forgot_password'
                    onClick={this.onClickFormTypeButton}
                    style={defaultForgotPasswordButtonStyle}
                  >
                    {this.props.forgotPasswordButtonTitle
                      ? this.props.forgotPasswordButtonTitle
                      : 'Forgot password?'}
                  </button>
                </div>
                <input
                  type='password'
                  name='passwordInput'
                  onChange={this.onChangeInput}
                  value={this.state.passwordInput}
                  style={defaultInputFieldStyle}
                />
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
              }}
            >
              {signUpFields.length > 0 && (
                <button
                  type='submit'
                  name='sign_up'
                  onClick={this.onClickFormTypeButton}
                  style={defaultFormStyleButton}
                >
                  {this.props.submitButtonTitle
                    ? this.props.submitButtonTitle
                    : 'Create an account'}
                </button>
              )}
              <button
                type='submit'
                onClick={this.onSubmit}
                style={defaultSubmitButtonStyle}
              >
                {this.props.signInSubmitButtonTitle
                  ? this.props.signInSubmitButtonTitle
                  : 'Continue'}
              </button>
            </div>
          </div>
        )}
        {this.state.formType == 'sign_up' && (
          <div>
            {this.props.signUpTitle && (
              <p style={defaultTitleStyle}>{this.props.signUpTitle}</p>
            )}
            {signUpFields.includes('username') && (
              <div style={defaultInputStyle}>
                <p style={defaultInputTitleStyle}>Username</p>
                <input
                  type='text'
                  name='usernameInput'
                  onChange={this.onChangeInput}
                  value={this.state.usernameInput}
                  style={defaultInputFieldStyle}
                />
              </div>
            )}
            {signUpFields.includes('email') && (
              <div style={defaultInputStyle}>
                <p style={defaultInputTitleStyle}>Email</p>
                <input
                  type='email'
                  name='emailInput'
                  onChange={this.onChangeInput}
                  value={this.state.emailInput}
                  style={defaultInputFieldStyle}
                />
              </div>
            )}
            {signUpFields.includes('password') && (
              <div style={defaultInputStyle}>
                <p style={defaultInputTitleStyle}>Password</p>
                <input
                  type='password'
                  name='passwordInput'
                  onChange={this.onChangeInput}
                  value={this.state.passwordInput}
                  style={defaultInputFieldStyle}
                />
              </div>
            )}
            {signUpFields.includes('confirmPassword') && (
              <div style={defaultInputStyle}>
                <p style={defaultInputTitleStyle}>Confirm password</p>
                <input
                  type='password'
                  name='passwordInput'
                  onChange={this.onChangeInput}
                  value={this.state.passwordConfirmationInput}
                  style={defaultInputFieldStyle}
                />
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
              }}
            >
              {signInFields.length > 0 && (
                <button
                  type='submit'
                  name='sign_in'
                  onClick={this.onClickFormTypeButton}
                  style={defaultFormStyleButton}
                >
                  {this.props.signUpButtonTitle
                    ? this.props.submitButtonTitle
                    : 'I have an account'}
                </button>
              )}
              <button
                type='submit'
                onClick={this.onSubmit}
                style={defaultSubmitButtonStyle}
              >
                {this.props.signUpSubmitButtonTitle
                  ? this.props.signUpSubmitButtonTitle
                  : 'Continue'}
              </button>
            </div>
          </div>
        )}
        {this.state.formType == 'forgot_password' && (
          <div>
            {this.props.forgotPasswordTitle && (
              <p style={defaultTitleStyle}>{this.props.forgotPasswordTitle}</p>
            )}
            <div style={defaultInputStyle}>
              <p style={defaultInputTitleStyle}>Email</p>
              <input
                type='email'
                name='emailInput'
                onChange={this.onChangeInput}
                value={this.state.emailInput}
                style={defaultInputFieldStyle}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
              }}
            >
              {signUpFields.length > 0 && (
                <button
                  type='submit'
                  name='sign_in'
                  onClick={this.onClickFormTypeButton}
                  style={defaultFormStyleButton}
                >
                  {this.props.submitButtonTitle
                    ? this.props.submitButtonTitle
                    : 'Cancel'}
                </button>
              )}
              <button
                type='submit'
                onClick={this.onSubmit}
                style={defaultSubmitButtonStyle}
              >
                {this.props.signInSubmitButtonTitle
                  ? this.props.signInSubmitButtonTitle
                  : 'Continue'}
              </button>
            </div>
          </div>
        )}
      </form>
    )
  }
}

export default AuthenticationForm
