import React, { useEffect, useState } from 'react'

function useCurrentUser(feather) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = feather.onStateChange((u) => {
      setIsLoading(false)
      if (JSON.stringify(u) !== JSON.stringify(currentUser)) {
        setCurrentUser(u)
      }
    })
    return () => unsubscribe()
  })
  return [isLoading, currentUser]
}

const FeatherContext = React.createContext(null)

export function FeatherProvider(props) {
  const [isLoading, currentUser] = props.feather
    ? useCurrentUser(props.feather)
    : [false, null]
  return (
    <FeatherContext.Provider
      value={{
        feather: props.feather,
        isLoadingCurrentUser: isLoading,
        currentUser
      }}
    >
      {props.children}
    </FeatherContext.Provider>
  )
}

export const withFeather = (Component) => (props) => {
  return (
    <FeatherContext.Consumer>
      {({ feather }) => <Component {...props} feather={feather} />}
    </FeatherContext.Consumer>
  )
}

export const withCurrentUser = (Component) => (props) => {
  return (
    <FeatherContext.Consumer>
      {({ isLoadingCurrentUser, currentUser }) => (
        <Component
          {...props}
          currentUser={currentUser}
          isLoadingCurrentUser={isLoadingCurrentUser}
        />
      )}
    </FeatherContext.Consumer>
  )
}
