import { FeatherError, ErrorType, ErrorCode } from 'feather-client-js'

export default function updateUser(params) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!state.user) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
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
        return that._database.updateCurrentState(state)
      })
      .then(() => {
        that._notifyStateObservers()
        resolve()
      })
      .catch((error) => reject(error))
  })
}
