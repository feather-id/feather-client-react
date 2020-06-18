// import fetchCurrentState from './fetchCurrentState.js'
// import updateCurrentState from './updateCurrentState.js'

const dbName = 'FeatherDB'
const version = 1
var _db = null

export default function Database(onSuccess, onError) {
  if (!(this instanceof Database)) {
    return new Database()
  }

  // Set to true to the entire local IndexedDB
  // if (true) {
  //   var req = indexedDB.deleteDatabase(dbName)
  //   req.onsuccess = function () {
  //     console.log('Deleted database successfully')
  //   }
  //   return
  // }

  var that = this
  var request = window.indexedDB.open(dbName, 1)
  request.onerror = function (event) {
    console.log('The database is opened failed')
    if (onError) {
      onError(event)
    }
  }

  request.onsuccess = function (event) {
    _db = request.result
    console.log('The database is opened successfully')
    if (onSuccess) {
      onSuccess(that)
    }
  }

  request.onupgradeneeded = function (event) {
    _db = request.result
    if (!_db.objectStoreNames.contains('state')) {
      var objectStore = _db.createObjectStore('state', {
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
        console.log('Transaction failed')
        reject(event)
      }

      request.onsuccess = function (event) {
        if (request.result) {
          resolve(request.result)
        } else {
          console.log('No data record')
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
      //.add({ id: 1, name: 'Jam', age: 24, email: 'jam@example.com' })

      request.onsuccess = function (event) {
        console.log('The data has been written successfully')
        resolve(event)
      }

      request.onerror = function (event) {
        console.log('The data has been written failed')
        reject(event)
      }
    })
  }
}
