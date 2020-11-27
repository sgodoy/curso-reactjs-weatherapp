import React, {Component} from 'react'

class ErrorBoundary extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            //activo: false
            hasError: false
        }
    }

    static getDerivedStateFromError(error){
        return { hasError: true}
    }

    componentDidCatch(erros, errorInfo){
        console.log("errorInfo", errorInfo)
    }

    estaActivo = () => {
        //return this.props.activo ? "Activo" : "No Activo"
        return this.state.activo ? "Activo" : "No Activo"
    }

    onClickHandler = () => {
        //this.state.activo = false -error ya que state es inmutable
        this.setState({activo: true})
    }

    componentDidMount() {
        console.log("El componente se ha montado")
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log("Estado previo:",prevState.activo)
        console.log("Estado nuevo:",this.state.activo)
        console.log("El componente se ha actualizado")
    }
    
    componentWillUnmount() {
        console.log("El componente se ha desmontado")
    }
    

    render() {
        return (
            this.state.hasError ? (<h1>Hubo un error</h1>) : (this.props.children)
            // <div>
            //     <button onClick={this.onClickHandler}>Activa</button>
            //     <h1>
            //         ErrorBoundary {this.props.saludo}
            //         {
            //             this.estaActivo()
            //         }
            //     </h1>
            // </div>
        
        )
    }

}

export default ErrorBoundary