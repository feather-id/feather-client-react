const errA = 'There is no currently active user'
const errB = 'The current user is anonymous and cannot have a password'
const errC = 'The provided current password is invalid'

export default function updateUserPassword(currentPassword, newPassword) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!state.user) {
          throw new Error(errA)
        }
        if (state.user.isAnonymous) {
          throw new Error(errB)
        }
        var params = {
          type: 'email|password',
          password: currentPassword,
          email: state.user.email
        }
        return Promise.all([state, that._api.credentials.create(params)])
      })
      .then(([state, credential]) => {
        if (credential.status != 'valid') {
          throw new Error(errC)
        }
        const credentialToken = credential.token
        return Promise.all([
          state,
          that._api.users.updatePassword(state.user.id, {
            credentialToken,
            newPassword
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
