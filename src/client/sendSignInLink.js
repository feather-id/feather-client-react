import { FeatherError, FeatherErrorType, FeatherErrorCode } from 'feather-client-js'
import { fetchCurrentState, updateCurrentState } from './database'

export default function sendSignInLink(email, redirectUrl) {
  const that = this
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
            state,
            that._client.credentials.create({
              email,
              redirectUrl,
              templateName: 'sign_in',
              scopes: 'upgrade_session'
            })
          ])
        }
      })
      .then(([state, credential]) => {
        state.credential = credential
        return updateCurrentState(state)
      })
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}
