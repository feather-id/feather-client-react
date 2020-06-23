import { Feather } from 'feather-client-js'
import { fetchCurrentState, updateCurrentState } from './database'
import confirmEmailVerificationLink from './confirmEmailVerificationLink.js'
import confirmForgotPasswordLink from './confirmForgotPasswordLink.js'
import confirmSignInLink from './confirmSignInLink.js'
import confirmUpdateEmailLink from './confirmUpdateEmailLink.js'
import currentSession from './currentSession.js'
import onStateChange from './onStateChange.js'
import sendEmailVerificationLink from './sendEmailVerificationLink.js'
import sendForgotPasswordLink from './sendForgotPasswordLink.js'
import sendSignInLink from './sendSignInLink.js'
import sendUpdateEmailLink from './sendUpdateEmailLink.js'
import signIn from './signIn.js'
import signInAnonymously from './signInAnonymously.js'
import signOut from './signOut.js'
import updateUser from './updateUser.js'
import updateUserEmail from './updateUserEmail.js'
import updateUserPassword from './updateUserPassword.js'

export function Client(apiKey, config = {}) {
  if (!(this instanceof Client)) {
    return new Client(apiKey, config)
  }
  if (!window.indexedDB) {
    throw new Error(
      "Your browser does not support a stable version of IndexedDB. This means Feather's stateful client interface is not supported on this device. For help or more information, please contact us at hello@feather.id."
    )
  }
  this._client = Feather(apiKey, config)

  fetchCurrentState()
    .then((state) => {
      if (!state) {
        updateCurrentState({
          credential: null,
          session: null,
          user: null
        })
      }
      this._notifyStateObservers()
    })
    .catch((error) => {
      console.log(error)
    })

  // this._database = new Database(
  //   (database) => {
  //     database.fetchCurrentState()
  //   },
  //   (error) => {
  //     throw new Error('Failed to initialize Feather database: ' + error)
  //   }
  // )
  this._onStateChangeObservers = []
  var that = this
  this._notifyStateObservers = function () {
    fetchCurrentState().then((state) => {
      that._onStateChangeObservers.forEach((observer) =>
        observer(state.session, state.user)
      )
    })
  }
  this.confirmEmailVerificationLink = confirmEmailVerificationLink
  this.confirmForgotPasswordLink = confirmForgotPasswordLink
  this.confirmSignInLink = confirmSignInLink
  this.confirmUpdateEmailLink = confirmUpdateEmailLink
  this.currentSession = currentSession
  this.onStateChange = onStateChange
  this.sendEmailVerificationLink = sendEmailVerificationLink
  this.sendForgotPasswordLink = sendForgotPasswordLink
  this.sendSignInLink = sendSignInLink
  this.sendUpdateEmailLink = sendUpdateEmailLink
  this.signIn = signIn
  this.signInAnonymously = signInAnonymously
  this.signOut = signOut
  this.updateUser = updateUser
  this.updateUserEmail = updateUserEmail
  this.updateUserPassword = updateUserPassword
  return this
}
