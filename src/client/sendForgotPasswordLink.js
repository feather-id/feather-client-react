const errA = 'The current user is already authenticated'

export default function sendForgotPasswordLink(params) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!!state.user && !state.user.isAnonymous) {
          throw new Error(errA)
        } else {
          return Promise.all([
            state,
            that._api.credentials.create({
              email: params.email,
              templateName: 'reset_password',
              redirectUrl: params.redirectUrl,
              scopes: 'upgrade_session, update_user_password'
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
