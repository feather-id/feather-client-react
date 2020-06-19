export default function currentSession() {
  const that = this
  return new Promise(function (resolve, reject) {
    that._database
      .fetchCurrentState()
      .then((state) => resolve(state ? state.session : null))
      .catch((error) => reject(error))
  })
}
