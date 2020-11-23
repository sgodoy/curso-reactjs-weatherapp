import React from 'react'
import Forecast from './Forecast'

export default {
    title: 'Forecast',
    component: Forecast
}

const forecastItemList = [
    {hour:13, state:'clear', temperature:17, weekDay:'Lunes'},
    {hour:14, state:'rain', temperature:16, weekDay:'Martes'},
    {hour:15, state:'drizzle', temperature:18, weekDay:'Miércoles'},
    {hour:16, state:'clouds', temperature:15, weekDay:'Jueves'},
    {hour:17, state:'snow', temperature:19, weekDay:'Viernes'},
]

export const ForecastExample = () => (<Forecast forecastItemList={forecastItemList} />)