import React from 'react'
import PropTypes from 'prop-types'
import {WiSnow, WiDayCloudy, WiThunderstorm, WiDaySunny, WiRain, WiRaindrop} from 'react-icons/wi'

export const validValues = [
    'clouds',
    'clear',
    'rain',
    'snow',
    'drizzle',
    'thunderstorm'
]

const stateByName = {
    clouds: WiDayCloudy,
    clear: WiDaySunny,
    rain: WiRain,
    snow: WiSnow,
    drizzle: WiRaindrop,
    thunderstorm: WiThunderstorm,
}

const IconState = ({state}) => {
    const StateIcon = stateByName[state] === undefined ? stateByName['clouds'] : stateByName[state] 
    return (
        <StateIcon />
    )
}

IconState.propTypes = {
    state: PropTypes.oneOf(validValues).isRequired
}

export default IconState
