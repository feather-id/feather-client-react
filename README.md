# feather-client-react

[![NPM](https://img.shields.io/npm/v/feather-client-react.svg)](https://www.npmjs.com/package/feather-client-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```sh
$ npm install feather-client-react --save
# or
$ yarn add feather-client-react
```

## Usage

Feather makes it incredibly easy to add an authentication form to your React app. Just import the pre-built authentication form and drop it into your app!

```jsx
import React, { Component } from 'react'
import { Feather, AuthenticationForm } from 'feather-client-react'

const feather = Feather('YOUR_API_KEY')

feather.onStateChange((user) => {
  console.log(`The current user is ${JSON.stringify(user)}`)
})

function App() {
  return (
    <div className='App'>
      <AuthenticationForm feather={feather} />
    </div>
  )
}

export default App
```
