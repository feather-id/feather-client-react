import { parseQueryParams } from './utils.js'

const errA = 'There is no active update email request from this device.'
const errB = "The provided URL is missing a 'code' query parameter."
const errC = 'The verification code is invalid.'

export default function confirmUpdateEmailLink(url) {
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
            state,
            that._api.credentials.update(state.credential.id, {
              verificationCode: params.code
            })
          ])
        }
      })
      .then(([state, credential]) => {
        if (credential.status != 'valid') {
          throw new Error(errC)
        }
        const credentialToken = credential.token
        Promise.all([
          state,
          that._api.users.update(session.userId, session.token)
        ])
      })
      .then(([state, user]) => {
        state.user = user
        that._database.updateCurrentState(state)
      })
      .then(() => {
        that._notifyStateObservers()
        resolve()
      })
      .catch((error) => reject(error))
  })
}
