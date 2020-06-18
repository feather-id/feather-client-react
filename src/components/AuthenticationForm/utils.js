export function mergeStyles(source: Object, target: Object = {}) {
  const styles = { ...source }
  Object.keys(target).forEach((key) => {
    if (source[key]) {
      styles[key] = target[key](source[key])
    }
  })
  return styles
}
