import { FeatherError, FeatherErrorType, FeatherErrorCode } from 'feather-client-js'
import { fetchCurrentState, updateCurrentState } from './database'

// TODO Update user with provided (optional) metadata after sign-in

export default function signIn(email, password) {
  var that = this
  return new Promise(function (resolve, reject) {
    fetchCurrentState()
      .then((state) => {
        if (!!state.user && !state.user.isAnonymous) {
          throw new FeatherError({
            type: FeatherErrorType.VALIDATION,
            code: FeatherErrorCode.CURRENT_STATE_INCONSISTENT,
            message: 'The current user is already authenticated.'
          })
        } else {
          return Promise.all([
            state.session,
            that._client.credentials.create({
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
            type: FeatherErrorType.VALIDATION,
            code: FeatherErrorCode.CREDENTIAL_INVALID,
            message: 'Incorrect email or password.'
          })
        }
        const credentialToken = credential.token
        if (session) {
          return that._client.sessions.upgrade(session.id, { credentialToken })
        } else {
          return that._client.sessions.create({ credentialToken })
        }
      })
      .then((session) =>
        Promise.all([
          session,
          that._client.users.retrieve(session.userId, session.token)
        ])
      )
      .then(([session, user]) =>
        updateCurrentState({ session, user, credential: null })
      )
      .then(() => {
        that._notifyStateObservers()
        resolve()
      })
      .catch((error) => reject(error))
  })
}
