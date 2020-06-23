import { FeatherError, FeatherErrorType, FeatherErrorCode } from 'feather-client-js'
import { fetchCurrentState, updateCurrentState } from './database'

export default function sendUpdateEmailLink(params) {
  const that = this
  return new Promise(function (resolve, reject) {
    fetchCurrentState()
      .then((state) => {
        if (state.user) {
          throw new FeatherError({
            type: FeatherErrorType.VALIDATION,
            code: FeatherErrorCode.CURRENT_STATE_INCONSISTENT,
            message: 'There is no current user on this client.'
          })
        } else if (state.user.isAnonymous) {
          throw new FeatherError({
            type: FeatherErrorType.VALIDATION,
            code: FeatherErrorCode.CURRENT_STATE_INCONSISTENT,
            message:
              'The current user is anonymous and their email cannot be updated.'
          })
        } else {
          return Promise.all([
            state,
            that._client.credentials.create({
              ...params,
              templateName: 'update_email',
              scopes: 'update_user_email'
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
