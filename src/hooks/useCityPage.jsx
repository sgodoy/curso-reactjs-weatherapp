import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/es'
import { useParams } from 'react-router-dom';
import { getForecastUrl } from '../utils/urls'
import { toCelsius } from '../utils/utils'


const useCityPage = () => {

    const [chartData, setCharData] = useState(null)
    const [forecastItemList, setForecastItemList] = useState(null)
     
    const {city, countryCode} = useParams()

    //console.log(params)

    useEffect( () => {
        
       const getForecast = async () => {
           
            const url = getForecastUrl({city, countryCode})

            try {
               

                const {data} = await axios.get(url)
                
                console.log("data", data)

                const daysAhead = [0,1,2,3,4,5]
                const days = daysAhead.map(d => moment().add(d, 'd'))
                const dataAux = days.map(day => {
                    
                    const tempObjArray = data.list.filter(item => {
                        //documentacion indica que es fecha tipo unix
                        const dayOfYear = moment.unix(item.dt).dayOfYear()
                        return dayOfYear === day.dayOfYear()
                    })
                    console.log("day.dayOfYear()", day.dayOfYear())
                    console.log("tempObjArray", tempObjArray)

                    const temps = tempObjArray.map(item => item.main.temp)
                    console.log("temps", temps)
                    //dayHour, min, max
                    return ({
                        dayHour: day.format('ddd'), 
                        min: toCelsius(Math.min(...temps)), //... destructuring de array
                        max: toCelsius(Math.max(...temps)),
                        hasTemps: (temps.length > 0 ? true : false)
                    })
                }).filter(item => item.hasTemps)

                console.log("dataAux", dataAux)
                setCharData(dataAux)

                //hour, state, temperature, weekDay
                const interval = [4,8,12,16,20,24]
                const forecastItemListAux = data.list
                    .filter((item, index) => interval.includes(index))
                    .map(item => {
                        return ({
                            hour: moment.unix(item.dt).hour(),
                            weekDay: moment.unix(item.dt).format('dddd'),
                            state: item.weather[0].main.toLowerCase(),
                            temperature: toCelsius(item.main.temp)
                        })
                    })
                setForecastItemList(forecastItemListAux)
            } catch (error){
                console.log(error)
            }
       }
    
       getForecast()

    }, [city, countryCode]) 

    return { city, chartData, forecastItemList }
}

export default useCityPage