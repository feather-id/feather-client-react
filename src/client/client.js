import API from '../api'
import Database from './database'
import confirmEmailVerificationLink from './confirmEmailVerificationLink.js'
import confirmForgotPasswordLink from './confirmForgotPasswordLink.js'
import confirmSignInLink from './confirmSignInLink.js'
import confirmSignUpLink from './confirmSignUpLink.js'
import currentSession from './currentSession.js'
import onStateChange from './onStateChange.js'
import sendEmailVerificationLink from './sendEmailVerificationLink.js'
import sendForgotPasswordLink from './sendForgotPasswordLink.js'
import sendSignInLink from './sendSignInLink.js'
import sendSignUpLink from './sendSignUpLink.js'
import signIn from './signIn.js'
import signInAnonymously from './signInAnonymously.js'
import signOut from './signOut.js'
import signUp from './signUp.js'
import updateUser from './updateUser.js'
import updateUserPassword from './updateUserPassword.js'

export default function Feather(apiKey, config = {}) {
  if (!(this instanceof Feather)) {
    return new Feather(apiKey, config)
  }
  if (!window.indexedDB) {
    console.log(
      // TODO
      "Your browser doesn't support a stable version of IndexedDB. This interface of Feather is not available."
    )
  }

  this._database = new Database(
    (database) => {
      database
        .fetchCurrentState()
        .then((state) => {
          console.log('State ' + state)
          if (!state) {
            database.updateCurrentState({
              credential: null,
              session: null,
              user: null
            })
          }
        })
        .catch((error) => {
          console.log('catch an error')
          console.log(error)
        })
    },
    (error) => {
      console.log('Failed to initialize database')
    }
  )

  this._api = new API(apiKey, config)
  this._currentSession = null
  this._currentUser = null
  this._currentCredential = null
  this.confirmEmailVerificationLink = confirmEmailVerificationLink
  this.confirmForgotPasswordLink = confirmForgotPasswordLink
  this.confirmSignInLink = confirmSignInLink
  this.confirmSignUpLink = confirmSignUpLink
  this.currentSession = currentSession
  this.onStateChange = onStateChange
  this.sendEmailVerificationLink = sendEmailVerificationLink
  this.sendForgotPasswordLink = sendForgotPasswordLink
  this.sendSignInLink = sendSignInLink
  this.sendSignUpLink = sendSignUpLink
  this.signIn = signIn
  this.signInAnonymously = signInAnonymously
  this.signOut = signOut
  this.signUp = signUp
  this.updateUser = updateUser
  this.updateUserPassword = updateUserPassword
  return this
}
