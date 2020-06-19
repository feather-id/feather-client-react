import { parseQueryParams } from './utils.js'

const errA = 'There is no active passwordless sign in request from this device.'
const errB = "The verification URL is missing a 'code' query parameter."
const errC = 'The verification code is invalid.'

export default function confirmSignInLink(url) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!state.credential) {
          throw new Error(errA)
        }
        const params = parseQueryParams(url)
        if (!params.code) {
          throw new Error(errB)
        }
        const verificationCode = params.code
        return Promise.all([
          state.session,
          that._api.credentials.update(state.credential.id, {
            verificationCode
          })
        ])
      })
      .then(([session, credential]) => {
        if (credential.status != 'valid') {
          throw new Error(errC)
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
