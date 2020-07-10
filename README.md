# feather-client-react

[![NPM](https://img.shields.io/npm/v/feather-client-react.svg)](https://www.npmjs.com/package/feather-client-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This library provides a fully-featured authentication form (sign-in, sign-up, and password-resets) as a single React component. Under the hood, this library wraps the [feather-client-js](https://github.com/feather-id/feather-client-js) library. If you like to build your own custom authentication forms, please checkout that library as well.

## Install

```sh
$ npm install feather-client-react --save
# or
$ yarn add feather-client-react
```

## Usage

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

## More Information

Have any questions? We're hanging out on [Discord](https://discord.gg/S55amqV)!
