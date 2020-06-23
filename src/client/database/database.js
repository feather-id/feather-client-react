const dbName = 'FeatherDB'
const version = 1
var _db = null

export default function Database(onSuccess, onError) {
  if (!(this instanceof Database)) {
    return new Database()
  }

  var that = this
  var request = window.indexedDB.open(dbName, version)
  request.onerror = function (event) {
    if (onError) {
      onError(event)
    }
  }

  request.onsuccess = function (event) {
    _db = request.result
    if (onSuccess) {
      onSuccess(that)
    }
  }

  request.onupgradeneeded = function (event) {
    _db = request.result
    if (!_db.objectStoreNames.contains('state')) {
      _db.createObjectStore('state', {
        keyPath: 'id'
      })
    }
    if (onSuccess) {
      onSuccess(that)
    }
  }

  this.fetchCurrentState = function () {
    return new Promise(function (resolve, reject) {
      var transaction = _db.transaction(['state'])
      var objectStore = transaction.objectStore('state')
      var request = objectStore.get('current')

      request.onerror = function (event) {
        reject(event)
      }

      request.onsuccess = function (event) {
        if (request.result) {
          resolve(request.result)
        } else {
          resolve(null)
        }
      }
    })
  }

  this.updateCurrentState = function (state) {
    return new Promise(function (resolve, reject) {
      state.id = 'current'
      var request = _db
        .transaction(['state'], 'readwrite')
        .objectStore('state')
        .put(state)

      request.onsuccess = function (event) {
        resolve(event)
      }

      request.onerror = function (event) {
        reject(event)
      }
    })
  }
}
