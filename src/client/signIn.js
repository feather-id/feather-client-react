import { FeatherError, ErrorType, ErrorCode } from '../errors'

// TODO Update user with provided (optional) metadata after sign-in

export default function signIn(email, password) {
  var that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!!state.user && !state.user.isAnonymous) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message: 'The current user is already authenticated.'
          })
        } else {
          return Promise.all([
            state.session,
            that._api.credentials.create({
              email,
              password,
              scopes: 'upgrade_session'
            })
          ])
        }
      })
      .then(([session, credential]) => {
        if (credential.status !== 'valid') {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CREDENTIAL_INVALID,
            message: 'Incorrect email or password.'
          })
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
