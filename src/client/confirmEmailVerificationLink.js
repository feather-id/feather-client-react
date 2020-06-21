// import { FeatherError, ErrorType, ErrorCode } from '../errors'
import { parseQueryParams } from './utils.js'

const errA = 'There is no active email verification request from this device.'
const errB = "The provided URL is missing a 'code' query parameter."
const errC = 'The verification code is invalid.'

export default function confirmEmailVerificationLink(url) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        const queryParams = parseQueryParams(url)
        if (!state.credential) {
          throw new Error(errA)
        } else if (!queryParams.code) {
          throw new Error(errB)
        } else {
          return Promise.all([
            state.session,
            that._api.credentials.update(state.credential.id, {
              verificationCode: queryParams.code
            })
          ])
        }
      })
      .then(([session, credential]) => {
        if (credential.status != 'valid') {
          throw new Error(errC)
        }
        return Promise.all([
          session,
          that._api.users.retrieve(session.userId, session.token)
        ])
      })
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
