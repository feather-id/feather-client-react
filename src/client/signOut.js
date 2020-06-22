import { FeatherError, ErrorType, ErrorCode } from '../errors'

export default function signOut(params) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!!state.session) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message: 'There is no currently active session on this client.'
          })
        } else {
          return Promise.all([
            state,
            that._api.sessions.revoke(state.session.id, {
              sessionToken: state.session.token
            })
          ])
        }
      })
      .then((state, session) => {
        state.session = session
        that._database.updateCurrentState(state)
      })
      .then(() => {
        that._notifyStateObservers()
        resolve()
      })
      .catch((error) => reject(error))
  })
}
