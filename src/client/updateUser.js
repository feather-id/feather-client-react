const errA = 'There is no currently active user'

export default function updateUser(params) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!state.user) {
          throw new Error(errA)
        }
        var params = {
          password,
          email: state.user.email,
          scopes: 'update_user_email'
        }
        return Promise.all([
          state,
          that._api.users.updateEmail(state.user.id, {
            metadata: params.metadata
          })
        ])
      })
      .then(([state, user]) => {
        state.user = user
        return that._database.updateCurrentState(state)
      })
      .then(() => {
        that._notifyStateObservers()
        resolve()
      })
      .catch((error) => reject(error))
  })
}
