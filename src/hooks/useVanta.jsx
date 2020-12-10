//primera renderización es null, el valor que entrego a useRef
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Clouds from 'vanta/dist/vanta.clouds.min';
import * as THREE from 'three';

const useVanta = () => {
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

    return myRefDiv
}

export default useVanta