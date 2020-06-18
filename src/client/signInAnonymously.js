export default function signInAnonymously() {
  // TODO
  const that = this
  return new Promise(function (resolve, reject) {
    // TODO fetch from indexedDB
    if (that._currentSession) {
      reject('TODO: You already have an active session')
    }

    that._api.sessions
      .create()
      .then((session) => {
        console.log(session)
        // TODO save to indexedDB
        // TODO get the user somehow
      })
      .catch((error) => reject(error))
  })
}
