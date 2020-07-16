import React, { useEffect, useState } from 'react'

function useCurrentUser(feather) {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    const unsubscribe = feather.onStateChange((u) => {
      if (JSON.stringify(u) !== JSON.stringify(currentUser)) {
        setCurrentUser(u)
      }
    })
    return () => unsubscribe()
  })
  return currentUser
}

const FeatherContext = React.createContext(null)

export function FeatherProvider(props) {
  const currentUser = useCurrentUser(props.feather)
  return (
    <FeatherContext.Provider
      value={{
        feather: props.feather,
        currentUser
      }}
    >
      {props.children}
    </FeatherContext.Provider>
  )
}

export const withFeather = (Component) => (props) => (
  <FeatherContext.Consumer>
    {({ feather, currentUser }) => <Component {...props} feather={feather} />}
  </FeatherContext.Consumer>
)

export const withCurrentUser = (Component) => (props) => (
  <FeatherContext.Consumer>
    {({ feather, currentUser }) => (
      <Component {...props} currentUser={currentUser} />
    )}
  </FeatherContext.Consumer>
)
