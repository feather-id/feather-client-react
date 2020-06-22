import { FeatherError, ErrorType, ErrorCode } from '../errors'
import { parseQueryParams } from './utils.js'

export default function confirmUpdateEmailLink(url) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        const params = parseQueryParams(url)
        if (!state.credential) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message:
              'There is no current passwordless update-email request on this client. Please note a passwordless update-email request can only be confirmed from the device and browser it was initiated from.'
          })
        } else if (!params.code) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.VERIFICATION_CODE_INVALID,
            message: "The provided URL is missing a 'code' query parameter."
          })
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
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.VERIFICATION_CODE_INVALID,
            message: 'The verification code is invalid.'
          })
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
