import React from 'react'
import {render} from '@testing-library/react'
import CityInfo from './CityInfo' // SUT: subject under testing

test('CityInfo render', async () => {
    //Arrange
    const city = "Santiago"
    const country = "Chile"
    /**
     * Render: renderiza el componente y retorna una serie de funciones de utilidad
     * En este caso utilizamos findAllByRole para consultat a nuestro componente
     */
    const { findAllByRole } = render(<CityInfo city={city} country={country} />)
    
    //Act
    /**
     * findAllByRole va a buscar todos los componentes que sean heading (h1,h2,etc)
     */
    const cityAndCountryComponent = await findAllByRole("heading")

    //Assert
    //¿cuando el test es correto?
    //cuando en el primer elemento se encuentre Santiago y en el segundo el país Chile
    expect(cityAndCountryComponent[0]).toHaveTextContent(city)
    expect(cityAndCountryComponent[1]).toHaveTextContent(country)
} )