import "./SliderButton.css"
import React from 'react'

export const SliderButton = ({clickFunction, label}) => {
  return (
    <button onClick={clickFunction} className="sliderButton">
        <span className="label">{label}</span>
        </button>
  )
}
