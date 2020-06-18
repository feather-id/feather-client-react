export function mergeStyles(source: Object, target: Object = {}) {
  // initialize with source styles
  const styles = { ...source }

  // massage in target styles
  Object.keys(target).forEach((key) => {
    if (source[key]) {
      styles[key] = target[key](source[key])
      // styles[key] = (rsCss, props) => {
      //   return target[key](source[key](rsCss, props), props)
      // }
    }
    // else {
    //   styles[key] = target[key]
    // }
  })

  return styles
}
