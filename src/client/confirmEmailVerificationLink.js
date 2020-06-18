import { parseQueryParams } from './utils.js'

// TODO this implementation is incomplete

export default function confirmEmailVerificationLink(url) {
  // TODO
  const that = this
  return new Promise(function (resolve, reject) {
    // TODO grab from indexedDB
    if (!that._currentCredential) {
      reject('TODO') // There is no current credential
      return
    }
    params = parseQueryParams(url)
    if (!params.code) {
      reject('TODO') // There is no code in the URL
      return
    }
    this._api.credentials
      .update(that._currentCredential.id, params.code)
      .then((credential) => {
        that._currentCredential
      })
      .catch((err) => {})
  })
}
