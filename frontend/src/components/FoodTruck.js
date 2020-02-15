import React from 'react';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

const keyMap = {
    locationid: "Location ID: ",
    Applicant: "Applicant: ",
    FacilityType: "Facility Type: ",
    LocationDescription: "Location Description: ",
    Address: "Addres: ",
    permit: "Permit: ",
    FoodItems: "Food Items: ",
    
}

class FoodTrucks extends React.Component {
    render() {
        const { foodTruck, position } = this.props
        return (
            <Grid item md={12} lg={4} xl={3}>
                <Paper elevation={5}>
                    <Grid container direction='column' spacing={1}>
                        {
                            Object.keys(keyMap).map((key, index) => 
                                <Grid item key={index}>
                                    <Typography>
                                        { keyMap[key] }
                                        { foodTruck[key] }
                                    </Typography>
                                </Grid>
                            )
                        }
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid container item justify="space-between">
                            <Grid item>
                                <Typography>
                                    {`Status: ${foodTruck.Status}`}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    target="_blank"
                                    href={`https://www.google.com/maps/dir/${position.latitude},${position.longitude}/${foodTruck.Latitude},${foodTruck.Longitude}`}
                                    variant="contained"
                                >
                                    See directions
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default FoodTrucks;
