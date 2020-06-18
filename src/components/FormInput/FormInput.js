import React from 'react'
import { css } from 'emotion'
import {
  defaultInputStyle,
  defaultInputFieldStyle,
  defaultInputTitleStyle,
  defaultForgotPasswordButtonStyle
} from '../styles.js'

export default function FormInput(props) {
  return (
    <div
      className={css`
        ${defaultInputStyle}
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
            ${defaultInputTitleStyle}
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
              ${defaultForgotPasswordButtonStyle}
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
          ${defaultInputFieldStyle}
        `}
      />
    </div>
  )
}
