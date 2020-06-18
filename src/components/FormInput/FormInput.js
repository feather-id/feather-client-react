import React from 'react'
import { css } from 'emotion'
import { defaultStyles } from '../styles.js'

export default function FormInput(props) {
  return (
    <div
      className={css`
        ${defaultStyles.inputContainer}
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
            ${defaultStyles.inputTitle}
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
              ${defaultStyles.forgotPasswordButton}
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
          ${defaultStyles.inputField}
        `}
      />
    </div>
  )
}
