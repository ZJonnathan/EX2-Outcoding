import React from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FoodTruck from './FoodTruck'
import { Typography } from '@material-ui/core';

class FoodTrucks extends React.Component {
    constructor(props) {
        super()
        this.state = {
            foodTrucks: [],
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/api/food-truks')
        .then(res => {
            this.setState({
                foodTrucks: res.data,
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
        const { foodTrucks } = this.state
        let filteredFoodTrucks = foodTrucks.slice()
        filteredFoodTrucks
        .sort((foodTruck1, foodTruck2) => {
            const distanceFoodTruck1 = this.calcDistance(foodTruck1, position)
            const distanceFoodTruck2 = this.calcDistance(foodTruck2, position)
            return distanceFoodTruck1 - distanceFoodTruck2
        })
        filteredFoodTrucks = filteredFoodTrucks.filter(foodTruck => (JSON.stringify(foodTruck)).includes(quickSearch))
        

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
                            <FoodTruck
                                key={index}
                                foodTruck={foodTruck}
                                distance={this.calcDistance(foodTruck, position)}
                                position={position}
                            />
                        )
                    }
                </Grid>
            </Container>
        );
    }
}

export default FoodTrucks;
