// frontend/src/TripDetailsComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const TripDetailsComponent = () => {
    const [tripDetails, setTripDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8000/trips/details');
                if (response && response.data) {
                    setTripDetails(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        };

        fetchTripDetails();
    }, []);

    return (
        <div className="trip-details-container">
            <h2>Trip Details</h2>
            {loading ? (
                <div className="loading-container">
                    <p>Loading...</p>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Pickup Location ID</th>
                            <th>Dropoff Location ID</th>
                            <th>Trip Miles</th>
                            <th>Trip Time</th>
                            <th>Base Passenger Fare</th>
                            <th>Driver Pay</th>
                            <th>Tips</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tripDetails.map((trip) => (
                            <tr key={trip._id}>
                                <td>{trip.PULocationID}</td>
                                <td>{trip.DOLocationID}</td>
                                <td>{trip.trip_miles}</td>
                                <td>{trip.trip_time}</td>
                                <td>${trip.base_passenger_fare.toFixed(2)}</td>
                                <td>${trip.driver_pay.toFixed(2)}</td>
                                <td>${trip.tips.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TripDetailsComponent;
