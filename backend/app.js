const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost:27017/parquetDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());

const Schema = mongoose.Schema;

const taxiTripSchema = new Schema({
    hvfhs_license_num: String,
    dispatching_base_num: String,
    originating_base_num: String,
    request_datetime: Date,
    on_scene_datetime: Date,
    pickup_datetime: Date,
    dropoff_datetime: Date,
    PULocationID: Number,
    DOLocationID: Number,
    trip_miles: Number,
    trip_time: Number,
    base_passenger_fare: Number,
    tolls: Number,
    bcf: Number,
    sales_tax: Number,
    congestion_surcharge: Number,
    airport_fee: Number,
    tips: Number,
    driver_pay: Number,
    shared_request_flag: String,
    shared_match_flag: String,
    access_a_ride_flag: String,
    wav_request_flag: String,
    wav_match_flag: String
}, { collection: "parquetCollection" });

const TaxiTrip = mongoose.model('TaxiTrip', taxiTripSchema);

app.use(express.static('public'));

// Endpoint to fetch all taxi trips
app.get('/trips', async (req, res) => {
    try {
        const trips = await TaxiTrip.find().limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to fetch a single trip by _id
app.get('/trip/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const trip = await TaxiTrip.findById(id);
        if (trip) {
            res.json(trip);
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to fetch trips by PULocationID or DOLocationID
app.get('/trips/location/:locationID', async (req, res) => {
    const locationID = parseInt(req.params.locationID);
    if (isNaN(locationID)) {
        return res.status(400).json({ message: 'Invalid location ID' });
    }
    try {
        const trips = await TaxiTrip.find({
            $or: [{ PULocationID: locationID }, { DOLocationID: locationID }]
        }).limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Express route to retrieve specific columns from trip data
app.get('/trips/details', async (req, res) => {

    try {
        const trips = await TaxiTrip.find({})
            .select('PULocationID DOLocationID trip_miles trip_time base_passenger_fare driver_pay tips')
            .limit(20);

        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Endpoint to fetch trips within a date range
app.get('/trips/daterange', async (req, res) => {
    const { start, end } = req.query;
    try {
        const trips = await TaxiTrip.find({
            request_datetime: {
                $gte: new Date(start),
                $lte: new Date(end)
            }
        }).limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to fetch trips by fare range
app.get('/trips/farerange', async (req, res) => {
    const { min, max } = req.query;
    try {
        const trips = await TaxiTrip.find({
            base_passenger_fare: {
                $gte: parseFloat(min),
                $lte: parseFloat(max)
            }
        }).limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to fetch trips by trip duration range
app.get('/trips/timerange', async (req, res) => {
    const { min, max } = req.query;
    try {
        const trips = await TaxiTrip.find({
            trip_time: {
                $gte: parseFloat(min),
                $lte: parseFloat(max)
            }
        }).limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Endpoint to fetch total trips per location
app.get('/trips/totalperlocation', async (req, res) => {
    try {
        const trips = await TaxiTrip.aggregate([
            {
                $group: {
                    _id: "$PULocationID",
                    totalTrips: { $sum: 1 }
                }
            }
        ]).limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to fetch average fare per location
app.get('/trips/averagefareperlocation', async (req, res) => {
    try {
        const trips = await TaxiTrip.aggregate([
            {
                $group: {
                    _id: "$PULocationID",
                    averageFare: { $avg: "$base_passenger_fare" }
                }
            }
        ]);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to fetch grouped data
app.get('/trips/groupeddata', async (req, res) => {
    try {
        const trips = await TaxiTrip.aggregate([
            {
                $group: {
                    _id: {
                        license_num: "$hvfhs_license_num",
                        PULocationID: "$PULocationID",
                        DOLocationID: "$DOLocationID"
                    },
                    totalTrips: { $sum: 1 },
                    averageFare: { $avg: "$base_passenger_fare" },
                    averageMiles: { $avg: "$trip_miles" },
                    averageTime: { $avg: "$trip_time" }
                }
            },
            { $sort: { "totalTrips": -1 } }
        ]).limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Route for Tips Range Component
app.get('/trips/tipsrange', async (req, res) => {
    try {
        const { min, max } = req.query;
        const trips = await TaxiTrip.find({
            tips: {
                $gte: parseFloat(min), // Ensure to parse float if using decimals
                $lte: parseFloat(max)
            }
        }).limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for Driver Pay Range Component
app.get('/trips/driverpayrange', async (req, res) => {
    try {
        const { min, max } = req.query;
        const trips = await TaxiTrip.find({
            driver_pay: {
                $gte: parseFloat(min), // Ensure to parse float if using decimals
                $lte: parseFloat(max)
            }
        }).limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for Shared Trips Component
app.get('/trips/sharedtrips', async (req, res) => {
    try {
        const trips = await TaxiTrip.find({ shared_request_flag: 'Y' }).limit(20);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
