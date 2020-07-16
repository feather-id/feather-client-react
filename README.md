# feather-client-react

[![NPM](https://img.shields.io/npm/v/feather-client-react.svg)](https://www.npmjs.com/package/feather-client-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This library provides a fully-featured authentication form (sign-in, sign-up, and password-resets) as a single React component. Under the hood, this library wraps the [feather-client-js](https://github.com/feather-id/feather-client-js) library. If you like to build your own custom authentication forms, please checkout that library as well.

Have any questions? We're hanging out on [Discord](https://discord.gg/S55amqV) 👋

## Install

```sh
$ npm install feather-client-react --save
# or
$ yarn add feather-client-react
```

## Usage

```jsx
import React from 'react'
import {
  Feather,
  AuthenticationForm,
  withCurrentUser
} from 'feather-client-react'

function App() {
  return (
    <Feather apiKey='pk_live_...'>
      <Home />
    </Feather>
  )
}

const Home = withCurrentUser((props) => {
  if (!props.currentUser) return <AuthenticationForm />
  else return <p>Current user: {props.currentUser.email}</p>
})

export default App
```
