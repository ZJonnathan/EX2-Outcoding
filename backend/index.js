const express = require('express')
const neatCsv = require('neat-csv')
const cors = require('cors')
const app = express()
const fs = require('fs')

app.use(cors())

app.get('/api/food-truks', (req, res) => {
    fs.readFile('./data.csv', async (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        data = await neatCsv(data)
        res.send(data)
    })
})

app.listen(5000, () => console.log('Listening on port 5000...'))