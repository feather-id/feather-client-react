import React from 'react'
import { css } from 'emotion'

class FormInput extends React.Component {
  render() {
    return (
      <div
        className={css`
          ${this.props.styles.inputContainer}
        `}
      >
        <div
          className={css`
            display: flex;
            flexdirection: row;
            width: 100%;
          `}
        >
          <p
            className={css`
              ${this.props.styles.inputTitle}
            `}
          >
            {this.props.title}
          </p>
          {this.props.helpButton && (
            <button
              type='button'
              name={this.props.helpButton.name}
              onClick={this.props.helpButton.onClick}
              className={css`
                ${this.props.styles.forgotPasswordButton}
              `}
            >
              {this.props.helpButton.title}
            </button>
          )}
        </div>
        <input
          id={this.props.id}
          type={this.props.type}
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          placeholder={this.props.placeholder}
          className={css`
            ${this.props.styles.inputField}
          `}
        />
      </div>
    )
  }
}

// onHide={this.handleClose.bind(this)}
export default FormInput
