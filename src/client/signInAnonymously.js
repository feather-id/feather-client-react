import { FeatherError, ErrorType, ErrorCode } from 'feather-client-js'

// TODO Update user with provided (optional) metadata after sign-in

export default function signInAnonymously() {
  const that = this
  return new Promise(function (resolve, reject) {
    that
      .currentSession()
      .then((session) => {
        if (session) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message: 'There is already an active session on this client.'
          })
        } else {
          return that._client.sessions.create()
        }
      })
      .then((session) =>
        Promise.all([
          session,
          that._client.users.retrieve(session.userId, session.token)
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
