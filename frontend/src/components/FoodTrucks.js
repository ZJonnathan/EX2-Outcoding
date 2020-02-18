import React from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FoodTruck from './FoodTruck'
import PropTypes from 'prop-types'

class FoodTrucks extends React.Component {
    constructor() {
        super()
        this.state = {
            foodTrucks: [],
            promiseStatus: 'pending'
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/api/food-truks')
        .then(res => {
            this.setState({
                foodTrucks: res.data,
                promiseStatus: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    calcDistance = (point1, point2) =>
        Math.sqrt(Math.pow(point1.Latitude - point2.latitude, 2)
        + Math.pow(point1.Longitude - point2.longitude, 2))

    render() {
        const { foodTrucksNerby, position, quickSearch, status } = this.props
        const { foodTrucks, promiseStatus } = this.state
        let filteredFoodTrucks = foodTrucks.slice()
        filteredFoodTrucks
        .sort((foodTruck1, foodTruck2) => {
            const distanceFoodTruck1 = this.calcDistance(foodTruck1, position)
            const distanceFoodTruck2 = this.calcDistance(foodTruck2, position)
            return distanceFoodTruck1 - distanceFoodTruck2
        })
        filteredFoodTrucks = filteredFoodTrucks.filter(foodTruck => (JSON.stringify(foodTruck)).includes(quickSearch))
        
        if(promiseStatus === 'pending') {
            return (
                <Container>
                    <Grid justify='center' container spacing={2}>
                        <Grid item>
                            <Typography>
                                We are retrieving data
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            )
        }
        if(status !== 'ALL'){
            filteredFoodTrucks = filteredFoodTrucks.filter(foodTruck => foodTruck.Status === status)    
        }
        if(filteredFoodTrucks.length === 0) {
            return (
                <Container>
                    <Grid justify='center' container spacing={2}>
                        <Grid item>
                            <Typography>
                                No foodtrucks match your filters
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            )
        }
        filteredFoodTrucks.length = foodTrucksNerby
        return (
            <Container maxWidth={false}>
                <Grid alignItems='center' container spacing={2}>
                    {
                        filteredFoodTrucks.map((foodTruck, index) =>
                            <Grid item md={12} lg={4} xl={3} key={index}>
                                <FoodTruck
                                    key={index}
                                    foodTruck={foodTruck}
                                    position={position}
                                />
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        );
    }
}

FoodTrucks.propTypes = {
    foodTrucksNerby: PropTypes.number.isRequired,
    position: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number
    }).isRequired,
    quickSearch: PropTypes.string,
    status: PropTypes.oneOf(['ALL', 'REQUESTED', 'APPROVED', 'EXPIRED']).isRequired
}

export default FoodTrucks;
