import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import CityInfo from './../componentes/CityInfo'
import Weather from './../componentes/Weather'
import WeatherDetails from './../componentes/WeatherDetails'
import ForecastChart from './../componentes/ForecastChart'
import Forecast from './../componentes/Forecast'
import AppFrame from './../componentes/AppFrame'
import useCityPage from './../hooks/useCityPage'

const CityPage = () => {

    const { city, chartData, forecastItemList } = useCityPage()

    //const city = "Buenos Aires"
    const country = "Argentina"
    const state = "cloudy"
    const temperature = 20
    const humidity = 80
    const wind = 5
    //const data = dataExample
    //const forecastItemList = forecastItemListExample

    return (
        <AppFrame>
            <Grid container justify="space-around" direction="column" spacing={2}>
                <Grid item container xs={12} justify="center" alignItems="flex-end">
                    <CityInfo city={city} country={country}></CityInfo>
                </Grid>
                <Grid container item xs={12} justify="center">
                        <Weather state={state} temperature={temperature}></Weather>
                        <WeatherDetails humidity={humidity} wind={wind}></WeatherDetails>
                </Grid>
                <Grid item xs={12}>
                    {chartData && <ForecastChart data={chartData}></ForecastChart>}
                </Grid>
                <Grid item xs={12}>
                   { forecastItemList && <Forecast forecastItemList={forecastItemList} ></Forecast>}
                </Grid>
            </Grid>
        </AppFrame>
        
            /* <div>
                <Link to="/main">Volver a Main</Link>
            </div> */
    )
}


export default CityPage
