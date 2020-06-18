import React from 'react'
import { css } from 'emotion'

export default function FormInput(props) {
  return (
    <div
      className={css`
        ${props.styles.inputContainer}
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
            ${props.styles.inputTitle}
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
              ${props.styles.forgotPasswordButton}
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
          ${props.styles.inputField}
        `}
      />
    </div>
  )
}
