import { FeatherError, ErrorType, ErrorCode } from '../errors'

export default function sendUpdateEmailLink(params) {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => {
        if (state.user) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message: 'There is no current user on this client.'
          })
        } else if (state.user.isAnonymous) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message:
              'The current user is anonymous and their email cannot be updated.'
          })
        } else {
          return Promise.all([
            state,
            that._api.credentials.create({
              ...params,
              templateName: 'update_email',
              scopes: 'update_user_email'
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
