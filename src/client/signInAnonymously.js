const errA = 'There is already an active session'

export default function signInAnonymously() {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (state.session) {
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
        that._database.updateCurrentState({ session, user })
      )
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}
