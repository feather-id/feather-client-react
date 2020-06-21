const errA = 'The current user is already authenticated'
const errB = 'The provided credentials were invalid'

// TODO Update user with provided (optional) metadata after sign-in

export default function signIn(params) {
  var that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!!state.user && !state.user.isAnonymous) {
          throw new Error(errA)
        }
        params.templateName = 'sign_in'
        params.scopes = 'upgrade_session'
        return Promise.all([
          state.session,
          that._api.credentials.create(params)
        ])
      })
      .then(([session, credential]) => {
        if (credential.status != 'valid') {
          throw new Error(errB) // TODO work out more complete/helpful error messages
        }
        const credentialToken = credential.token
        if (session) {
          return that._api.sessions.upgrade(session.id, { credentialToken })
        } else {
          return that._api.sessions.create({ credentialToken })
        }
      })
      .then((session) =>
        Promise.all([
          session,
          that._api.users.retrieve(session.userId, session.token)
        ])
      )
      .then(([session, user]) =>
        that._database.updateCurrentState({ session, user, credential: null })
      )
      .then(() => {
        that._notifyStateObservers()
        resolve()
      })
      .catch((error) => reject(error))
  })
}
