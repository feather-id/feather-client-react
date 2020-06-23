import { FeatherError, ErrorType, ErrorCode } from 'feather-client-js'

export default function updateUserEmail(password, newEmail) {
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
              'The current user is anonymous and their email cannot be updated.'
          })
        } else {
          return Promise.all([
            state,
            that._client.credentials.create({
              password,
              email: state.user.email,
              scopes: 'update_user_email'
            })
          ])
        }
      })
      .then(([state, credential]) => {
        if (credential.status !== 'valid') {
          throw new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.CREDENTIAL_INVALID,
            message: 'Incorrect password.'
          })
        }
        const credentialToken = credential.token
        return Promise.all([
          state,
          that._client.users.updateEmail(state.user.id, {
            credentialToken,
            newEmail
          })
        ])
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
