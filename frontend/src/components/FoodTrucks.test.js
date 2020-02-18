import React from 'react';
import ReactDOM from 'react-dom'
import FoodTrucks from './FoodTrucks';

it('<FoodTrucks />', () => {
    const foodTrucks = [{
        locationid: "1181510",
        Applicant: "John's Catering #5",
        FacilityType: "Truck",
        cnn: "12726000",
        LocationDescription: "TURK ST: GOUGH ST to LAGUNA ST (900 - 1099)",
        Address: "1003 TURK ST",
        blocklot: "0759001",
        block: "0759",
        lot: "001",
        permit: "18MFF-0045",
        Status: "EXPIRED",
        FoodItems: "Cold Truck: Soda:Chips:Candy: Cold/Hot Sandwiches: Donuts. (Pitco Wholesale)",
        X: "6005248.473",
        Y: "2112517.984",
        Latitude: "37.7808684365681",
        Longitude: "-122.425467726618",
        Schedule: "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=18MFF-0045&ExportPDF=1&Filename=18MFF-0045_schedule.pdf",
        dayshours: "Mo-Fr:8AM-9AM/11AM-12PM",
        NOISent: "",
        Approved: "07/06/2018 12:00:00 AM",
        Received: "2018-07-06",
        PriorPermit: "1",
        ExpirationDate: "07/15/2019 12:00:00 AM",
        Location: "POINT (-122.425467726618 37.7808684365681)"
    }]

    const foodTrucksNerby = Math.floor(Math.random() * 180)
    const statuses = ['ALL', 'REQUESTED', 'APPROVED', 'EXPIRED']
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    const position = {
        latitude: Math.random() * 180,
        longitude: Math.random() * 180,
    }

    const div = document.createElement('div')
    ReactDOM.render(
        <FoodTrucks
            foodTrucks={foodTrucks}
            foodTrucksNerby={foodTrucksNerby}
            position={position}
            status={status}
        />,
        div
    )
})