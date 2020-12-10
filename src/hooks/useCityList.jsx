import React, {useState, useEffect} from 'react'
import axios from 'axios'
import convertUnits from 'convert-units'
import { getCityCode, toCelsius } from './../utils/utils';
import { getWeatherUrl } from '../utils/urls';

const useCityList = (cities) => {
    
    //hook state
    const [allWeather, setAllWeather] = useState({})
    const [error, setError] = useState(null)
    /*
        [ciudad-pais] = {temperatute:x, state:"x"}
    */


    //hook state
    useEffect(() => {
        const setWeather = async (city, countryCode) => {

            const url = getWeatherUrl({city,countryCode})

            try {
                const response = await axios.get(url)

                const {data} = response //destructuring, response completo en documentación de axios
                const temperature = toCelsius(data.main.temp)
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

    return {allWeather, error, setError}
} 

export default useCityList