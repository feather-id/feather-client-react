import { FeatherError, ErrorType, ErrorCode } from 'feather-client-js'

export default function sendForgotPasswordLink(email, redirectUrl) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (!!state.user && !state.user.isAnonymous) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message: 'The current user is already authenticated.'
          })
        } else {
          return Promise.all([
            state,
            that._client.credentials.create({
              email,
              redirectUrl,
              templateName: 'reset_password',
              scopes: 'upgrade_session, update_user_password'
            })
          ])
        }
      })
      .then(([state, credential]) => {
        state.credential = credential
        return that._database.updateCurrentState(state)
      })
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}
