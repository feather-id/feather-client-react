import { FeatherError, ErrorType, ErrorCode } from '../errors'

export default function sendEmailVerificationLink(redirectUrl) {
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
        } else if (state.user.isAnonymous) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message:
              'The current user is anonymous and does not have an email address.'
          })
        } else if (!state.user.email) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message: "The current user doesn't have an email address."
          })
        } else if (state.user.isEmailVerified) {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CURRENT_STATE_INCONSISTENT,
            message: "The current user's email address is already verified."
          })
        } else {
          return Promise.all([
            state,
            that._api.credentials.create({
              email: state.user.email,
              redirectUrl: params.redirectUrl,
              scopes: 'verify_user_email',
              templateName: 'verify_email'
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
