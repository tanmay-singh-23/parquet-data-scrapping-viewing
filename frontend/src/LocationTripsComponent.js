// frontend/src/LocationTripsComponent.js

import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const LocationTripsComponent = () => {
    const [trips, setTrips] = useState([]);
    const [locationID, setLocationID] = useState('');

    const fetchTripsByLocation = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/trips/location/${locationID}`);
            if (response && response.data) {
                setTrips(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="table-container">
            <h2>Trips by Location</h2>
            <div className="location-input">
                <label>
                    Location ID:
                    <input type="text" value={locationID} onChange={(e) => setLocationID(e.target.value)} />
                </label>
                <button onClick={fetchTripsByLocation}>Fetch Trips</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>License Number</th>
                        <th>Dispatching Base</th>
                        <th>Originating Base</th>
                        <th>Request Datetime</th>
                        <th>Pickup Datetime</th>
                        <th>Dropoff Datetime</th>
                        <th>PULocationID</th>
                        <th>DOLocationID</th>
                        <th>Trip Miles</th>
                        <th>Trip Time</th>
                        <th>Base Passenger Fare</th>
                        <th>Tolls</th>
                        <th>BCF</th>
                        <th>Sales Tax</th>
                        <th>Congestion Surcharge</th>
                        <th>Airport Fee</th>
                        <th>Tips</th>
                        <th>Driver Pay</th>
                        <th>Shared Request Flag</th>
                        <th>Shared Match Flag</th>
                        <th>Access-a-Ride Flag</th>
                        <th>WAV Request Flag</th>
                        <th>WAV Match Flag</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((trip) => (
                        <tr key={trip._id}>
                            <td>{trip.hvfhs_license_num}</td>
                            <td>{trip.dispatching_base_num}</td>
                            <td>{trip.originating_base_num}</td>
                            <td>{new Date(trip.request_datetime).toLocaleString()}</td>
                            <td>{new Date(trip.pickup_datetime).toLocaleString()}</td>
                            <td>{new Date(trip.dropoff_datetime).toLocaleString()}</td>
                            <td>{trip.PULocationID}</td>
                            <td>{trip.DOLocationID}</td>
                            <td>{trip.trip_miles}</td>
                            <td>{trip.trip_time}</td>
                            <td>{trip.base_passenger_fare}</td>
                            <td>{trip.tolls}</td>
                            <td>{trip.bcf}</td>
                            <td>{trip.sales_tax}</td>
                            <td>{trip.congestion_surcharge}</td>
                            <td>{trip.airport_fee}</td>
                            <td>{trip.tips}</td>
                            <td>{trip.driver_pay}</td>
                            <td>{trip.shared_request_flag}</td>
                            <td>{trip.shared_match_flag}</td>
                            <td>{trip.access_a_ride_flag}</td>
                            <td>{trip.wav_request_flag}</td>
                            <td>{trip.wav_match_flag}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LocationTripsComponent;
