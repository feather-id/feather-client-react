const errA = 'There is already an active session'

// TODO Update user with provided (optional) metadata after sign-in

export default function signInAnonymously() {
  const that = this
  return new Promise(function (resolve, reject) {
    that
      .currentSession()
      .then((session) => {
        if (session) {
          throw new Error(errA)
        } else {
          return that._api.sessions.create()
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
