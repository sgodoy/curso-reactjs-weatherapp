import React from 'react'
import { useHistory } from 'react-router-dom'
import CityList from './../componentes/CityList'
import AppFrame from './../componentes/AppFrame'
import Paper from '@material-ui/core/Paper'

const cities = [
    {city:"Buenos Aires", country:"Argentina", countryCode: "AR"},
    {city:"Bogotá", country:"Colombia", countryCode: "CO" },
    {city:"Madrid", country:"España", countryCode: "ES"},
    {city:"Ciudad de México", country:"México", countryCode: "MX"}
]

const MainPage = () => {
    const history = useHistory()

    const onClickHandler = () => {
        // permite trabajar con la url y cambiarla
        history.push("/city")
    }

    return (
        <AppFrame>
            <Paper elevation={3}>
                <CityList cities={cities} onClickCity={onClickHandler}/>
            </Paper> 
        </AppFrame>
    )
}

export default MainPage
