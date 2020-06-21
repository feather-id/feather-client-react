const errA = 'There is no currently active user'
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
          const redirectUrl = params.redirectUrl
          return Promise.all([
            state,
            that._api.credentials.create({
              email,
              templateName,
              redirectUrl,
              scopes: 'verify_user_email'
            })
          ])
        }
      })
      .then(([state, credential]) => {
        state.credential = credential
        return that._database.updateCurrentState(state)
      })
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}
