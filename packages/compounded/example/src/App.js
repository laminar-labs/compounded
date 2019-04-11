import React, { Component, useState } from 'react'

import ExampleComponent from 'compounded'

// TODO: how should these interactions be called? should we use all existing event listeners, for example?
// FIXME: move code to src, put it here right now because I can't compile.
// FIXME: can we make this static? Right now they're created on every render...


/**
|--------------------------------------------------
| abstraction to create state container hook based on keywords
|--------------------------------------------------
*/

const useInteractionBase = (interactions, initialState) => {
  const interactionHooks = interactions.reduce((acc, curr) => {
    // capitalize it for camelCase
    const currFirst = curr.split('')[0].toUpperCase()
    const currString = [currFirst, curr.slice(1, curr.length)].join('')

    // intialize the states
    const init = initialState ? initialState[curr.toLowerCase()] : undefined;
    const [state, setState] = useState(init)

    return {
      ...acc,
      [`set${currString}`]: setState,
      [curr]: state,
    }
  }, {})

  return interactionHooks
}
const makeInteractionHook = interactions => initialState => useInteractionBase(interactions, initialState)

/**
|--------------------------------------------------
| userInteraction API creation
|--------------------------------------------------
*/

const userInteractions = ["hover", "down"]
const useInteraction = makeInteractionHook(userInteractions)


/**
|--------------------------------------------------
| dropdown API
|--------------------------------------------------
*/

const dropDownInteractions = ["dropped", "inputValue",]
const useDropdownState = makeInteractionHook(dropDownInteractions)
const useDropdown = () => {
  // TODO: add other dropdown state interactions here
  return {
    ...useDropdownState()
  }
}

export default () => {
  const {hover, setHover, down, setDown} = useInteraction({
    hover: false
  })

  const { dropped, setDropped } = useDropdown()

  return (
    <div>
      <div>is down: {down ? "yes" : "no"}</div>
      <div>is hover: {hover ? "yes" : "no"}</div>
      <div>is dropped: {dropped ? "yes" : "no"}</div>
      <div
        onClick={() => setDropped(!dropped)}
        onMouseEnter={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onMouseDown={() => setDown(true)}
        onMouseUp={() => setDown(false)}
        style={{
          padding: 40,
          border: "3px solid black"
        }}
      >

        hover me, or click me! (isdropped is toggled by clicking)
      </div>
    </div>
  )
}
