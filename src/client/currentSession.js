import { fetchCurrentState, updateCurrentState } from './database'

export default function currentSession() {
  const that = this
  return new Promise(function (resolve, reject) {
    fetchCurrentState()
      .then((state) => resolve(state ? state.session : null))
      .catch((error) => reject(error))
  })
}
