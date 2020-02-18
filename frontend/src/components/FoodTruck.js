import React from 'react';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

const keyMap = {
    locationid: "Location ID: ",
    Applicant: "Applicant: ",
    FacilityType: "Facility Type: ",
    LocationDescription: "Location Description: ",
    Address: "Addres: ",
    permit: "Permit: ",
    FoodItems: "Food Items: ",
}

const StyledPaper = styled(Paper)({
    padding: '30px',
});

class FoodTrucks extends React.Component {
    render() {
        const { foodTruck, position } = this.props
        return (
            <StyledPaper>
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
                    <Grid
                        alignItems='center'
                        container
                        item
                        justify="space-between"
                    >
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
            </StyledPaper>
        );
    }
}

FoodTrucks.propTypes = {
    foodTruck: PropTypes.object.isRequired,
    position: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number
    }).isRequired,
}

export default FoodTrucks;
