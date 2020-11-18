import React from 'react'
import {Link} from  'react-router-dom'
import Grid from '@material-ui/core/Grid'
import CityInfo from './../componentes/CityInfo'
import Weather from './../componentes/Weather'
import WeatherDetails from './../componentes/WeatherDetails'
import ForecastChart from './../componentes/ForecastChart'
import Forecast from './../componentes/Forecast'

const city="Santiago"
const country="Chile" 
const temperature=10
const state="cloud"
const humidity=10
const wind=9

const data = [
    {
        "dayHour": "Jue 18",
        "min": 14,
        "max": 22,
    },
    {
        "dayHour": "Vie 06",
        "min": 18,
        "max": 27,
    },
    {
        "dayHour": "Vie 12",
        "min": 18,
        "max": 28,
    },
    {
        "dayHour": "Vie 18",
        "min": 18,
        "max": 25,
    },
    {
        "dayHour": "Sab 06",
        "min": 15,
        "max": 22,
    },
    {
        "dayHour": "Sab 12",
        "min": 12,
        "max": 19,
    }
]

const forecastItemList = [
    {hour:13, state:'sunny', temperature:17, weekDay:'Lunes'},
    {hour:14, state:'rain', temperature:16, weekDay:'Martes'},
    {hour:15, state:'fog', temperature:18, weekDay:'Miércoles'},
    {hour:16, state:'cloudy', temperature:15, weekDay:'Jueves'},
    {hour:17, state:'sunny', temperature:19, weekDay:'Viernes'},
]

const CityPage = () => {
    return (
        <Grid container justify="space-around" direction="column" spacing={2}>
            <Grid item container xs={12} justify="center" alignItems="flex-end">
                <CityInfo city={city} country={country}></CityInfo>
            </Grid>
            <Grid container item xs={12} justify="center">
                    <Weather state={state} temperature={temperature}></Weather>
                    <WeatherDetails humidity={humidity} wind={wind}></WeatherDetails>
            </Grid>
            <Grid item xs={12}>
                <ForecastChart data={data}></ForecastChart>
            </Grid>
            <Grid item xs={12}>
                <Forecast forecastItemList={forecastItemList} ></Forecast>
            </Grid>
        </Grid>
            /* <div>
                <Link to="/main">Volver a Main</Link>
            </div> */
    )
}


export default CityPage
