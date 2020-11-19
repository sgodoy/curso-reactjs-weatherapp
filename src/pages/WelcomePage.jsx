import { Grid, Link, Typography } from '@material-ui/core'
import React from 'react'
import { IconContext } from 'react-icons/lib'
import { WiDaySunny } from 'react-icons/wi'
import WelcomeScreen from './../componentes/WelcomeScreen'
import {Link as RouterLink} from 'react-router-dom'

const WelcomePage = () => {
    return (
        <WelcomeScreen>
            <Grid container direction="column" justify="center" className="full">
                <div className="highlight">
                    <Grid item container xs={12} justify="center" alignItems="center">
                        <Grid item>
                            <IconContext.Provider value={{ size: "6em"}}>
                               <WiDaySunny />
                            </IconContext.Provider>
                        </Grid>
                        <Grid item container direction="column" justify="center" alignItems="center">
                            <Typography variant="h4" color="inherit" >
                                Weather App
                            </Typography>
                            <Link color="inherit" aria-label="menu" component={RouterLink}
                                to="/main">Ingresar</Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </WelcomeScreen>
    )
}

export default WelcomePage
