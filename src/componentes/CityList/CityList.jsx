import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import convertUnits from 'convert-units'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Alert from '@material-ui/lab/Alert'
import ListItem from '@material-ui/core/ListItem'
import CityInfo from './../CityInfo'
import Weather from './../Weather'

const getCityCode = (city, countryCode) => `${city}-${countryCode}`
//renderCityAndCountry se va aconvertir en una función que retorna otra función
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    const {city, countryCode, country} = cityAndCountry
    //const {temperature, state} = weather

    return (
        <ListItem button key={getCityCode(city, countryCode)} onClick={eventOnClickCity}>
            <Grid container justify="center" alignItems="center">
                <Grid item md={9} xs={12}>   
                    <CityInfo city={city} country= {country} />
                </Grid>
                <Grid item md={3} xs={12}>   
                    <Weather temperature={weather && weather.temperature} state={weather && weather.state}/>
                </Grid>
            </Grid>
            
            
        </ListItem>
    )
}

const CityList = ({ cities, onClickCity }) => {
    //hook state
    const [allWeather, setAllWeather] = useState({})
    const [error, setError] = useState(null)
    /*
        [ciudad-pais] = {temperatute:x, state:"x"}
    */


    //hook state
    useEffect(() => {
        const setWeather = async (city, countryCode) => {
            const appid = "71e499c40db826745fe55612c16c109d-";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`

            try {
                const response = await axios.get(url)

                const {data} = response //destructuring, response completo en documentación de axios
                const temperature = Number(convertUnits(data.main.temp).from("K").to("C").toFixed(0))
                const state = data.weather[0].main.toLowerCase()
                const propName = getCityCode(city, countryCode)
                const propValue = {temperature,state}

                setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue }))
            } catch (error) {
                if (error.response) { //errores que nos responde el servidor
                    setError("Ha ocurido un error en el servidor del clima")
                } else if(error.request){ //errores que suceden por no llegar al server
                     setError("Verifique la conexión a internet")
                } else { //errores imprevistos
                     setError("Ha ocurido un error al cargar los datos")
                }
            }
            

            //con promises
            // .then(response => {
            //     const {data} = response //destructuring, response completo en documentación de axios
            //     const temperature = Number(convertUnits(data.main.temp).from("K").to("C").toFixed(0))
            //     const state = data.weather[0].main.toLowerCase()
            //     const propName = `${city}-${country}`
            //     const propValue = {temperature,state}
                
            //     setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue }))
            // })
            // .catch(error => {
            //     if (error.response) { //errores que nos responde el servidor
            //         const {data, status} = error.response
            //         setError("Ha ocurido un error en el servidor del clima")
            //     } else if(error.request){ //errores que suceden por no llegar al server
            //         setError("Verifique la conexión a internet")
            //     } else { //errores imprevistos
            //         setError("Ha ocurido un error al cargar los datos")
            //     } 
            // })
        }
        
        cities.forEach(({city,countryCode}) => {
            setWeather(city,countryCode)
        });

    }, [cities])

    return (
        <div>
            {
                error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
            }
            <List>
            {
                cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry,
                    allWeather[getCityCode(cityAndCountry.city, cityAndCountry.countryCode)]))
            }
            </List>
        </div>
        
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
