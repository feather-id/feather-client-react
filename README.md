# feather-client-react

[![NPM](https://img.shields.io/npm/v/feather-client-react.svg)](https://www.npmjs.com/package/feather-client-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```sh
$ npm install feather-client-react --save
# or
$ yarn add feather-client-react
```

## Usage

Feather makes adding authentication to your app incredibly easy. Just import one of the pre-built authentication forms and drop it into your app!

```jsx
import React, { Component } from 'react'

import { Feather, PasswordAuthenticationForm } from 'feather-client-react'

function App() {
  const feather = Feather('pk_test_tZxHb2NRqGLt2A9qqhbdA8u7XdINW17A')

  feather.onStateChange((session, user) => {
    // The app's authentication state has changed
  })

  return (
    <div className='App'>
      <h1>DEMO</h1>
      <PasswordAuthenticationForm
        feather={feather}
        redirectUrl='https://yourapp.com/verify'
      />
    </div>
  )
}

export default App
```

## More Information

- [Feather Docs](https://feather.id/docs)
- [API Reference](https://feather.id/docs/api)
- [Error Handling](https://feather.id/docs/api#errors)
