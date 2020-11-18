import React from 'react'
import {findAllByRole, fireEvent, render} from '@testing-library/react'
import CityList from './CityList'

const cities = [
    {city:"Buenos Aires", country:"Argentina"},
    {city:"Bogotá", country:"Colombia"},
    {city:"Madrid", country:"España"},
    {city:"Ciudad de México", country:"México"}
]

test("CityList renders", async () => {
    //arrange
    const {findAllByRole} = render(<CityList cities={cities} onClickCity={() => {}}/>)
    //act
    //listitem -> <li>
    const items = await findAllByRole("button")
    //asert
    expect(items).toHaveLength(4)
})

test("CityList click on item", async () => {
    //simular acción de usuario (click) -> usar función "mock"
    const fnClickOnItem = jest.fn()

    const {findAllByRole} = render(<CityList cities={cities} onClickCity={fnClickOnItem} />)

    const items = await findAllByRole("button")

    //fireEvent -> sirve para simular la acción, es parte de la librería testing-library/react
    fireEvent.click(items[0])

    //se debería llamar a la función fnClickOnItem

    expect(fnClickOnItem).toHaveBeenCalledTimes(1)
})