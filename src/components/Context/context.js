import React, { useContext, useEffect, useState } from 'react'

function _observeCurrentUser(feather) {
  const [state, setState] = useState({
    isLoading: true,
    currentUser: null
  })
  useEffect(() => {
    const unsubscribe = feather.onStateChange((u) => {
      if (JSON.stringify(u) !== JSON.stringify(state.currentUser))
        setState({ isLoading: false, currentUser: u })
      else if (state.isLoading) setState({ isLoading: false })
    })
    return () => unsubscribe()
  }, [])
  return state
}

const FeatherContext = React.createContext(null)

export function FeatherProvider(props) {
  return (
    <FeatherContext.Provider value={{ feather: props.client }}>
      {props.children}
    </FeatherContext.Provider>
  )
}

export const useFeather = () => {
  const ctx = useContext(FeatherContext)
  if (!ctx) return null
  return ctx.feather
}

export const useCurrentUser = () => {
  const feather = useFeather()
  const [state, setState] = useState({
    currentUser: null,
    loading: true,
    error: feather
      ? null
      : new Error(
          'No Feather client available. This hook can only be used in a child component wrapped by <Feather></Feather> tags. For more details, please see the Feather documentation at https://feather.id/docs'
        )
  })

  useEffect(() => {
    var mounted = true
    if (!feather) return (mounted = false)
    const unsubscribe = feather.onStateChange((currentUser) => {
      if (!mounted) return
      if (JSON.stringify(currentUser) !== JSON.stringify(state.currentUser)) {
        setState({ currentUser, loading: false, error: null })
      } else if (state.loading) {
        setState({ ...state, loading: false })
      }
    })
    return () => {
      mounted = false
      unsubscribe()
    }
  })

  return state
}
