import { parseQueryParams } from './utils.js'

const errA = 'There is no active password reset request from this device.'
const errB = "The provided URL is missing a 'code' query parameter."
const errC = 'The verification code is invalid.'

export default function confirmForgotPasswordLink(url, newPassword) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        const params = parseQueryParams(url)
        if (!state.credential) {
          throw new Error(errA)
        } else if (!params.code) {
          throw new Error(errB)
        } else {
          return Promise.all([
            state.session,
            that._api.credentials.update(state.credential.id, {
              verificationCode: params.code
            })
          ])
        }
      })
      .then(([session, credential]) => {
        if (credential.status != 'valid') {
          throw new Error(errC)
        }
        const credentialToken = credential.token
        if (session) {
          return Promise.all([
            credentialToken,
            that._api.sessions.upgrade(session.id, { credentialToken })
          ])
        } else {
          return Promise.all([
            credentialToken,
            that._api.sessions.create({ credentialToken })
          ])
        }
      })
      .then(([credentialToken, session]) =>
        Promise.all([
          session,
          that._api.users.updatePassword(session.userId, {
            credentialToken,
            newPassword
          })
        ])
      )
      .then(([session, user]) =>
        that._database.updateCurrentState({ credential: null, session, user })
      )
      .then(() => {
        that._notifyStateObservers()
        resolve()
      })
      .catch((error) => reject(error))
  })
}
