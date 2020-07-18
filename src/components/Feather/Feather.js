import React, { useEffect, useState } from 'react'
import { FeatherClient } from 'feather-client-js'
import { FeatherProvider } from '../Context'

class Feather extends React.Component {
  initializeFeather(props) {}

  constructor(props) {
    super(props)
    if (props.client) {
      this.state = { feather: props.client }
    } else {
      try {
        const config = props.config ? props.config : {}
        const feather = FeatherClient(props.apiKey, config)
        this.state = { feather }
      } catch (e) {
        this.state = { feather: null }
      }
    }
  }

  componentDidMount() {
    if (!this.state.feather) {
      try {
        const config = this.props.config ? this.props.config : {}
        const feather = FeatherClient(this.props.apiKey, config)
        this.setState({ feather })
      } catch (e) {
        // Do nothing
      }
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
