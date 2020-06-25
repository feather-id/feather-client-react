export const defaultConfig = {
  signIn: {
    title: 'Sign in to your account',
    inputs: {
      email: {},
      password: {}
    }
  },
  signUp: {
    title: 'Create an account',
    inputs: {
      email: {},
      password: {},
      confirmPassword: {}
    }
  },
  forgotPassword: {
    title: 'Reset your password',
    subtitle:
      "Enter the email address associated with your account, and we'll send you a link to reset your password.",
    inputs: {
      email: {}
    }
  }
}
