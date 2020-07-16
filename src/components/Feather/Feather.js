import React, { useEffect, useState } from 'react'
import { Client } from 'feather-client-js'
import { FeatherProvider } from '../Context'

class Feather extends React.Component {
  constructor(props) {
    super(props)
    this.state = { feather: null }
  }

  componentDidMount() {
    if (!this.state.feather) {
      this.setState({ feather: Client(this.props.apiKey) })
    }
  }

  render() {
    return (
      <FeatherProvider feather={this.state.feather}>
        {this.props.children}
      </FeatherProvider>
    )
  }
}

export default Feather
