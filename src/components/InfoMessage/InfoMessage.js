import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { css } from 'emotion'

export default function InfoMessage(params) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: 16px 4px 32px 4px;
      `}
    >
      <FontAwesomeIcon
        className={css`
          ${params.styles.infoIcon}
        `}
        icon={faInfoCircle}
      />
      <p
        className={css`
          ${params.styles.infoMessage}
        `}
      >
        {params.message}
      </p>
    </div>
  )
}
