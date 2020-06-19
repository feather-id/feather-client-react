const errA = 'The current user is already authenticated'

export default function sendSignInLink(params) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (state.user && !state.user.isAnonymous) {
          throw new Error(errA)
        } else {
          const email = params.email
          const templateName = 'sign_in'
          return Promise.all([
            state,
            that._api.credentials.create({
              type: 'email',
              // params.redirectUrl,
              email,
              templateName
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
