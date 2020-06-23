import React from 'react'
import { css } from 'emotion'

export default function FormInput(params) {
  return (
    <div
      className={css`
        ${params.styles.inputContainer}
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
            ${params.styles.inputTitle}
          `}
        >
          {params.title}
        </p>
        {params.helpButton && (
          <button
            type='button'
            name={params.helpButton.name}
            onClick={params.helpButton.onClick}
            className={css`
              ${params.styles.forgotPasswordButton}
            `}
          >
            {params.helpButton.title}
          </button>
        )}
      </div>
      <input
        ref={params.inputRef}
        type={params.type}
        name={params.name}
        onChange={params.onChange}
        value={params.value}
        placeholder={params.placeholder}
        className={css`
          ${params.styles.inputField}
        `}
      />
    </div>
  )
}

// onHide={handleClose.bind(this)}
// export default FormInput
