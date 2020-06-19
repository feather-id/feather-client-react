import credentialTypes from '../credentialTypes'
import utils from '../utils'
import FeatherError from '../errors/featherError'
import ErrorType from '../errors/errorType'
import ErrorCode from '../errors/errorCode'

const credentials = {
  _gateway: null,

  /**
   * Creates a credential
   * @arg { email, username, password, verificationUrl, templateName }
   * @return credential
   */
  create: function (data) {
    const that = this
    return new Promise(function (resolve, reject) {
      // Validate input
      try {
        utils.validateData(data, {
          isRequired: false,
          params: {
            email: {
              type: 'string'
            },
            username: {
              type: 'string'
            },
            password: {
              type: 'string'
            },
            redirectUrl: {
              type: 'string'
            },
            templateName: {
              type: 'string'
            }
          }
        })
      } catch (error) {
        reject(error)
        return
      }

      // Send request
      that._httpGateway
        .sendRequest('POST', '/credentials', data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  },

  /**
   * Updates a credential
   * @arg id
   * @arg { verificationCode }
   * @return the updated credential
   */
  update: function (id, data) {
    const that = this
    return new Promise(function (resolve, reject) {
      // Validate input
      if (typeof id !== 'string') {
        reject(
          new FeatherError({
            type: ErrorType.VALIDATION,
            code: ErrorCode.PARAMETER_INVALID,
            message: `expected param 'id' to be of type 'string'`
          })
        )
        return
      }
      try {
        utils.validateData(data, {
          isRequired: true,
          params: {
            verificationCode: {
              type: 'string',
              isRequired: true
            }
          }
        })
      } catch (error) {
        reject(error)
        return
      }

      // Send request
      const path = '/credentials/' + id
      that._httpGateway
        .sendRequest('POST', path, data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }
}

export default credentials
