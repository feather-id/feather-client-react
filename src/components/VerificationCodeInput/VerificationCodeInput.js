import React, { useEffect, useRef, useState } from 'react'
import FormInput from '../FormInput'
import { css } from 'emotion'

export default function VerificationCodeInput(params) {
  const [didLoad, setDidLoad] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')
  const [valueC, setValueC] = useState('')
  const [valueD, setValueD] = useState('')
  const [valueE, setValueE] = useState('')
  const [valueF, setValueF] = useState('')
  const refA = useRef()
  const refB = useRef()
  const refC = useRef()
  const refD = useRef()
  const refE = useRef()
  const refF = useRef()

  useEffect(() => {
    if (!didLoad) {
      refA.current.focus()
      setDidLoad(true)
    }
    if (!didSubmit) {
      const verificationCode = `${valueA}${valueB}${valueC}${valueD}${valueE}${valueF}`
      if (verificationCode.length === 6) {
        setDidSubmit(true)
        params.onSubmit(verificationCode)
      }
    }
  })

  const onFocus = (event) => {
    event.preventDefault()
    if (event.target.value === '') {
      return
    }
    switch (event.target.name) {
      case 'A':
        setValueA('')
        break
      case 'B':
        setValueB('')
        break
      case 'C':
        setValueC('')
        break
      case 'D':
        setValueD('')
        break
      case 'E':
        setValueE('')
        break
      case 'F':
        setValueF('')
        break
      default:
    }
  }

  const onKeyDown = (event) => {
    var key = event.keyCode || event.charCode
    if (key == 8 || key == 46) {
      switch (event.target.name) {
        case 'A':
          break
        case 'B':
          setValueA('')
          refA.current.focus()
          break
        case 'C':
          setValueB('')
          refB.current.focus()
          break
        case 'D':
          setValueC('')
          refC.current.focus()
          break
        case 'E':
          setValueD('')
          refD.current.focus()
          break
        case 'F':
          setValueE('')
          refE.current.focus()
          break
        default:
      }
    }
  }

  const validDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const onChangeInput = (event) => {
    event.preventDefault()
    const v =
      event.target.value.length > 0
        ? event.target.value.charAt(event.target.value.length - 1)
        : ''
    switch (event.target.name) {
      case 'A':
        if (validDigits.includes(v)) {
          setValueA(v)
          setValueB('')
          refB.current.focus()
        }
        break

      case 'B':
        if (validDigits.includes(v)) {
          setValueB(v)
          setValueC('')
          refC.current.focus()
        }
        break

      case 'C':
        if (validDigits.includes(v)) {
          setValueC(v)
          setValueD('')
          refD.current.focus()
        }
        break

      case 'D':
        if (validDigits.includes(v)) {
          setValueD(v)
          setValueE('')
          refE.current.focus()
        }
        break

      case 'E':
        if (validDigits.includes(v)) {
          setValueE(v)
          setValueF('')
          refF.current.focus()
        }
        break

      case 'F':
        if (validDigits.includes(v)) {
          setValueF(v)
        }
        break

      default:
        break
    }
  }

  const inputStyle = {
    WebkitAppearance: 'none',
    display: 'flex',
    fontSize: '20px',
    textAlign: 'center',
    height: '48px',
    width: 'calc((100% / 6) - 16px)',
    margin: '0px 8px',
    border: '0px',
    borderBottom: '1px solid hsl(214, 36%, 84%)',
    color: 'hsl(214, 24%, 32%)',
    borderRadius: '0px',
    ':first-child': {
      margin: '0px 8px 0px 0px'
    },
    ':last-child': {
      margin: '0px 0px 0px 8px'
    },
    ':focus': {
      outline: 'none'
    },
    '::placeholder': {
      color: 'hsl(214, 36%, 84%)'
    }
  }

  return (
    <div
      className={css`
        display: flex;
        width: 100%;
        margin: 32px 0px 0px 0px;
      `}
    >
      <input
        ref={refA}
        type='text'
        name='A'
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChangeInput}
        disabled={didSubmit}
        value={valueA}
        className={css`
          ${inputStyle}
        `}
      />
      <input
        ref={refB}
        type='text'
        name='B'
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChangeInput}
        disabled={didSubmit}
        value={valueB}
        className={css`
          ${inputStyle}
        `}
      />
      <input
        ref={refC}
        type='text'
        name='C'
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChangeInput}
        disabled={didSubmit}
        value={valueC}
        className={css`
          ${inputStyle}
        `}
      />
      <input
        ref={refD}
        type='text'
        name='D'
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChangeInput}
        disabled={didSubmit}
        value={valueD}
        className={css`
          ${inputStyle}
        `}
      />
      <input
        ref={refE}
        type='text'
        name='E'
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChangeInput}
        disabled={didSubmit}
        value={valueE}
        className={css`
          ${inputStyle}
        `}
      />
      <input
        ref={refF}
        type='text'
        name='F'
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={onChangeInput}
        disabled={didSubmit}
        value={valueF}
        className={css`
          ${inputStyle}
        `}
      />
    </div>
  )
}
