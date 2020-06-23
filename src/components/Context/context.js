import React from 'react'

export const FeatherContext = React.createContext(null)

export const withFeather = (Component) => (props) => (
  <FeatherContext.Consumer>
    {(feather) => <Component {...props} feather={feather} />}
  </FeatherContext.Consumer>
)
