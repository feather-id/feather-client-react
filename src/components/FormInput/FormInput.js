import React from 'react'
import { css } from 'emotion'
import { defaultStyle } from '../styles.js'

// defaultInputStyle,
// defaultInputFieldStyle,
// defaultInputTitleStyle,
// defaultForgotPasswordButtonStyle

export default function FormInput(props) {
  return (
    <div
      className={css`
        ${defaultStyle.inputContainer}
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
            ${defaultStyle.inputTitle}
          `}
        >
          {props.title}
        </p>
        {props.helpButton && (
          <button
            type='button'
            name={props.helpButton.name}
            onClick={props.helpButton.onClick}
            className={css`
              ${defaultStyle.forgotPasswordButton}
            `}
          >
            {props.helpButton.title}
          </button>
        )}
      </div>
      <input
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        className={css`
          ${defaultStyle.inputField}
        `}
      />
    </div>
  )
}
