import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CityInfo from './../CityInfo'
import Weather from './../Weather'

//renderCityAndCountry se va aconvertir en una función que retorna otra función
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    const {city, country} = cityAndCountry
    //const {temperature, state} = weather

    return (
        <ListItem button key={city} onClick={eventOnClickCity}>
            <Grid container justify="center" alignItems="center">
                <Grid item md={9} xs={12}>   
                    <CityInfo city={city} country= {country} />
                </Grid>
                <Grid item md={3} xs={12}>   
                    {
                        weather ? <Weather temperature={weather.temperature} state={weather.state}/> : ("No hay datos")
                    }
                </Grid>
            </Grid>
            
            
        </ListItem>
    )
}

const CityList = ({ cities, onClickCity }) => {
    //hook state
    const [allWeather, setAllWeather] = useState({})
    /*
        [ciudad-pais] = {temperatute:x, state:"x"}
    */


    //hook state
    useEffect(() => {
        const setWeather = (city, country, countryCode) => {
            const appid = "";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`

            axios
            .get(url)
            .then(response => {
                const {data} = response //destructuring, response completo en documentación de axios
                const temperature = data.main.temp
                const state = data.weather[0].main.toLowerCase()
                const propName = `${city}-${country}`
                const propValue = {temperature,state}

                console.log('propName',propName)
                console.log('propValue',propValue)
                
                setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue }))
            })
        }
        
        cities.forEach(({city,country,countryCode}) => {
            setWeather(city,country,countryCode)
        });

    }, [cities])

    //const weather = {temperature: 10, state: "sunny"}

    return (
        <List>
            {
                cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry,
                    allWeather[`${cityAndCountry.city}-${cityAndCountry.country}`]))
            }
        </List>
    )
}

CityList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            city: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            countryCode: PropTypes.string.isRequired
        })
    ).isRequired,
    onClickCity: PropTypes.func.isRequired
}

export default CityList
