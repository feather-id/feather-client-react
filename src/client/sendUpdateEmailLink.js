const errA = 'There is no currently active user'
const errB = 'The current user is anonymous and their email cannot be updated'

export default function sendUpdateEmailLink(params) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!!state.user) {
          throw new Error(errA)
        } else if (state.user.isAnonymous) {
          throw new Error(errB)
        } else {
          params.templateName = 'update_email'
          params.scopes = 'update_user_email'
          return Promise.all([state, that._api.credentials.create(params)])
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
