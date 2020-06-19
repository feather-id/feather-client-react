const errA = 'There is no currently registered user'
const errB = 'The current user is anonymous and does not have an email address'
const errC = "The current user doesn't have an email address"
const errD = "The current user's email address is already verified"

export default function sendEmailVerificationLink(redirectUrl) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!state.user) {
          throw new Error(errA)
        } else if (state.user.isAnonymous) {
          throw new Error(errB)
        } else if (!state.user.email) {
          throw new Error(errC)
        } else if (state.user.isEmailVerified) {
          throw new Error(errD)
        } else {
          const email = state.user.email
          const templateName = 'verify_email'
          return that._api.credentials.create({
            email,
            redirectUrl,
            templateName
          })
        }
      })
      .then((credential) => resolve())
      .catch((error) => reject(error))
  })
}
