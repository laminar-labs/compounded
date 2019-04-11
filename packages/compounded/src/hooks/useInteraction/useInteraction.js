import { useState } from 'react'

// TODO: how should these interactions be called? should we use all existing event listeners, for example?

const userInteraction = ["Hover", "Down"]

const makeUserInteraction = interactions => initialState => useInteraction(interactions, initialState)

// FIXME: can we make this static? Right now they're created on every render...
const useInteraction = (interactions, initialState) => {
  const interactionHooks = interactions.reduce((acc, curr) => {
    const init = initialState ? initialState[curr.toLowerCase()] : undefined;
    const [state, setState] = useState(init)

    return {
      ...acc,
      [`set${curr}`]: setState,
      [`is${curr}`]: state,
    }
  }, {})

  return interactionHooks
}

export default useInteraction
