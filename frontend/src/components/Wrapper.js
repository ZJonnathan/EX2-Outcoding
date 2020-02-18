import React from 'react';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import FoodTrucks from './FoodTrucks'
import { styled } from '@material-ui/core/styles'

const statuses = ['ALL', 'REQUESTED', 'APPROVED', 'EXPIRED']

const StyledPaper = styled(Paper)({
    padding: '30px',
});

const StyledGrid = styled(Grid)({
    height: '100vh',
});
  
class Wrapper extends React.Component {
    constructor(props) {
        super()
        this.state = {
            latitude: 0,
            longitude: 0,
            foodTrucksNerby: 1,
            status: 'ALL',
            promiseStatus: 'pending',
            quickSearch: '',
        }
        this.onChangeTextField = this.onChangeTextField.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)
    }

    componentDidMount(){
        this.setCurrentLocation()
    }

    setCurrentLocation = () => {
        const location = window.navigator.geolocation
        location.getCurrentPosition(pos => {
            this.setState({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                promiseStatus: 'ok',
            })
        })
    }

    onChangeTextField = (event, key, type) => {
        let value = event.target.value
        if (type === 'number') {
            value = value === "" ? 0 : parseFloat(value)
        }
        this.setState({
            [key]: value
        })
    }

    onChangeStatus = event => {
        this.setState({
            status: event.target.value
        })
    }

    render() {
        const { onChangeStatus, onChangeTextField } = this
        const {
            promiseStatus,
            latitude,
            longitude,
            foodTrucksNerby,
            status,
            quickSearch,
        } = this.state
        if(promiseStatus === 'pending'){
            return (
                <Typography>
                    Retrieving current location...
                </Typography>
            )
        } else if (promiseStatus === 'ok'){
            return (
                <Container maxWidth={false}>
                    <Grid
                        alignItems='center'
                        container
                        spacing={2}
                    >
                        <Grid item>
                            <StyledPaper elevation={5}>
                                <Grid
                                    container
                                    direction='column'
                                    spacing={2}
                                >
                                    <Grid item>
                                        <TextField
                                            id='quick-search'
                                            label='Quick search'
                                            onChange={event => onChangeTextField(event, 'quickSearch', 'string')}
                                            value={quickSearch}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label='Number of foodtrucks'
                                            onChange={event => onChangeTextField(event, 'foodTrucksNerby', 'number')}
                                            value={foodTrucksNerby}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControl>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                onChange={onChangeStatus}
                                                value={status}
                                            >
                                                {
                                                    statuses.map((status, index) => 
                                                        <MenuItem
                                                            key={index}
                                                            value={status}
                                                        >
                                                            { status }
                                                        </MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label='Latitude'
                                            onChange={event => onChangeTextField(event, 'latitude', 'number')}
                                            value={latitude}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label='Longitud'
                                            onChange={event => onChangeTextField(event, 'longitude', 'number')}
                                            value={longitude}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            color='primary'
                                            onClick={this.setCurrentLocation}
                                            variant='contained'
                                        >
                                            Set Current Location
                                        </Button>
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                        </Grid>
                        <StyledGrid item xs >
                            <Box
                                overflow='auto'
                                height='100%'
                                widht='100%'
                            >
                                <FoodTrucks
                                    status={status}
                                    quickSearch={quickSearch}
                                    foodTrucksNerby={foodTrucksNerby}
                                    position={{ latitude, longitude }}
                                />
                            </Box>
                        </StyledGrid>
                    </Grid>
                </Container>
            );
        }
    }
}

export default Wrapper