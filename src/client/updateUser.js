import { FeatherError, FeatherErrorType, FeatherErrorCode } from 'feather-client-js'
import { fetchCurrentState, updateCurrentState } from './database'

export default function updateUser(params) {
  const that = this
  return new Promise(function (resolve, reject) {
    fetchCurrentState()
      .then((state) => {
        if (!state.user) {
          throw new FeatherError({
            type: FeatherErrorType.VALIDATION,
            code: FeatherErrorCode.CURRENT_STATE_INCONSISTENT,
            message: 'There is no current user on this client.'
          })
        } else {
          return Promise.all([
            state,
            that._client.users.updateEmail(state.user.id, {
              metadata: params.metadata
            })
          ])
        }
      })
      .then(([state, user]) => {
        state.user = user
        return updateCurrentState(state)
      })
      .then(() => {
        that._notifyStateObservers()
        resolve()
      })
      .catch((error) => reject(error))
  })
}
