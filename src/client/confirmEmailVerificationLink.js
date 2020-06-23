import { FeatherError, FeatherErrorType, FeatherErrorCode } from 'feather-client-js'
import { fetchCurrentState, updateCurrentState } from './database'
import { parseQueryParams } from './utils.js'

export default function confirmEmailVerificationLink(url) {
  const that = this
  return new Promise(function (resolve, reject) {
    fetchCurrentState()
      .then((state) => {
        const queryParams = parseQueryParams(url)
        if (!state.credential) {
          throw new FeatherError({
            type: FeatherErrorType.VALIDATION,
            code: FeatherErrorCode.CURRENT_STATE_INCONSISTENT,
            message:
              'There is no current email-verification request on this client. Please note an email-verification request can only be confirmed from the device and browser it was initiated from.'
          })
        } else if (!queryParams.code) {
          throw new FeatherError({
            type: FeatherErrorType.VALIDATION,
            code: FeatherErrorCode.VERIFICATION_CODE_INVALID,
            message: "The provided URL is missing a 'code' query parameter."
          })
        } else {
          return Promise.all([
            state.session,
            that._client.credentials.update(state.credential.id, {
              verificationCode: queryParams.code
            })
          ])
        }
      })
      .then(([session, credential]) => {
        if (credential.status !== 'valid') {
          throw new FeatherError({
            type: FeatherErrorType.VALIDATION,
            code: FeatherErrorCode.VERIFICATION_CODE_INVALID,
            message: 'The verification code is invalid.'
          })
        }
        return Promise.all([
          session,
          that._client.users.retrieve(session.userId, session.token)
        ])
      })
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
