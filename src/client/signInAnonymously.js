export default function signInAnonymously() {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (state.session) {
          throw new Error('TODO: You already have an active session')
        } else {
          return that._api.sessions.create()
        }
      })
      .then((session) => {
        // TODO get the user somehow
        console.log('Created a new anonymous session')
        console.log(session)
        return that._database.updateCurrentState({ session })
      })
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}
