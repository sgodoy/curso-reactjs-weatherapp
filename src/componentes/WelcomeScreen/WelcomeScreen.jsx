import React, {useRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Clouds from 'vanta/dist/vanta.clouds.min'
import * as THREE from 'three'

const WelcomeScreen = ({children}) => {

    //primera renderización es null, el valor que entrego a useRef
    const myRefDiv = useRef(null)
    const [vanta, setVanta] = useState(0); // vanta inicializado en 0

    console.log("myRefDiv.current", myRefDiv.current)

    useEffect(() => {
        console.log("myRefDiv.current en useEffect", myRefDiv.current)

        //solo debe pasar una vez por el if, comparación con 0 puede ser FALSE booleano
        if(!vanta){
            setVanta(
                Clouds({
                THREE,
                el: myRefDiv.current
            })
            ) //vanta queda con valor distinto a 0

            console.log("Establezco vanta a un valor diferente de 0")
        }
        //al salir de la pantalla debemos detener el efecto => desasociar todos los rescursos (div + vanta effect)
        return () => {
            if(vanta){
                vanta.destroy()
                console.log("libero recursos")
            }
        }
    }, [vanta])

    return (
        <div className="full" ref={myRefDiv}>
            {children}
        </div>
    )
}

WelcomeScreen.propTypes = {
    children: PropTypes.node
}

export default WelcomeScreen
