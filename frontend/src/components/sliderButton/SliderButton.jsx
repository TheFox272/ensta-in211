import "./SliderButton.css"
import React from 'react'

export const SliderButton = ({clickFunction, label}) => {
  return (
    <button onClick={clickFunction} className="sliderButton">
      <div className="background-slider"></div>
        <span className="label">{label}</span>
        </button>
  )
}
