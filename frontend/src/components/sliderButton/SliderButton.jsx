import "./SliderButton.css"
import React from 'react'

export const SliderButton = ({clickFunction, label}) => {
  return (
    <button onClick={clickFunction}>
        <span className="label">{label}</span>
        <span className="button-decor"></span>
        </button>
  )
}
