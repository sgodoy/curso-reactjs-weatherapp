import { Grid,Link, Typography } from '@material-ui/core'
import React from 'react'
import { IconContext } from 'react-icons/lib'
import { WiRain } from 'react-icons/wi'
import {Link as RouterLink} from 'react-router-dom'

export const NotFoundPage = () => {
    return (
        <Grid container direction="column" justify="center" className="full">
                <div className="highlight">
                    <Grid item container xs={12} justify="center" alignItems="center">
                        <Grid item>
                            <IconContext.Provider value={{ size: "6em"}}>
                               <WiRain />
                            </IconContext.Provider>
                        </Grid>
                        <Grid item container direction="column" justify="center" alignItems="center">
                            <Typography variant="h4" color="inherit" >
                                404 | La página no existe
                            </Typography>
                            <Link color="inherit" aria-label="menu" component={RouterLink}
                                to="/main">Ingresar</Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
    )
}

export default NotFoundPage
