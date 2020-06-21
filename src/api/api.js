import resources from './resources'
import utils from './utils'
import HttpGateway from './httpGateway.js'
import { ErrorCode, ErrorType, FeatherError } from '../errors'

const ALLOWED_PROTOCOLS = ['https', 'http']
const ALLOWED_CONFIG_PROPERTIES = ['protocol', 'host', 'port', 'basePath']

export default function API(apiKey, config = {}) {
  if (!(this instanceof API)) {
    return new API(apiKey, config)
  }

  // Validate inputs
  if (typeof apiKey !== 'string') {
    throw new FeatherError({
      type: ErrorType.API_AUTHENTICATION,
      code: ErrorCode.API_KEY_INVALID,
      message: `expected 'apiKey' to be of type 'string'`
    })
  }
  config = this._validateConfig(config)

  // Initialize the SDK
  this._httpGateway = new HttpGateway(apiKey, config)
  this._prepareResources()
  return this
}

API.prototype = {
  /**
   * @private
   * This may be removed in the future.
   */
  _prepareResources() {
    for (let name in resources) {
      var resource = { ...resources[name] }
      resource._httpGateway = this._httpGateway
      this[utils.pascalToCamelCase(name)] = resource
    }
  },

  /**
   * @private
   * This may be removed in the future.
   */
  _validateConfig(config) {
    // If config is null or undefined, just bail early with no props
    if (!config) {
      return {}
    }

    // Config can only be an object
    if (typeof config !== 'object') {
      throw new FeatherError({
        type: ErrorType.VALIDATION,
        code: ErrorCode.PARAMETER_INVALID,
        message: `expected 'config' to be of type 'object'`
      })
    }

    // Verify the config does not contain any unexpected values
    const values = Object.keys(config).filter(
      (value) => !ALLOWED_CONFIG_PROPERTIES.includes(value)
    )
    if (values.length > 0) {
      throw new FeatherError({
        type: ErrorType.VALIDATION,
        code: ErrorCode.PARAMETER_UNKNOWN,
        message: `'config' contained the following unknown attributes: ${values.join(
          ', '
        )}`
      })
    }

    // Verify the protocol
    if (config.protocol && !ALLOWED_PROTOCOLS.includes(config.protocol)) {
      throw new FeatherError({
        type: ErrorType.VALIDATION,
        code: ErrorCode.PARAMETER_INVALID,
        message: `expected 'protocol' to be one of either: 'http' or 'https'`
      })
    }

    return config
  }
}
