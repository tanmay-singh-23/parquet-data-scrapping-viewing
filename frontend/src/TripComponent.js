import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const TripComponent = () => {
    const [tripId, setTripId] = useState('');
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTripById = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:8000/trip/${tripId}`);
            if (response && response.data) {
                setTrip(response.data);
            } else {
                setError('Trip not found.');
            }
        } catch (error) {
            console.error('Error fetching trip:', error);
            setError('Error fetching trip. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTripById();
    };

    return (
        <div className="trip-container">
            <h2>Fetch Trip by ID</h2>
            <form onSubmit={handleSubmit}>
                <label>Trip ID:</label>
                <input type="text" value={tripId} onChange={(e) => setTripId(e.target.value)} required />
                <button type="submit" disabled={loading}>
                    {loading ? 'Fetching...' : 'Fetch Trip'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {trip && (
                <div className="trip-details">
                    <h3>Trip Details</h3>
                    <p><strong>License Number:</strong> {trip.hvfhs_license_num}</p>
                    <p><strong>Dispatching Base:</strong> {trip.dispatching_base_num}</p>
                    <p><strong>Originating Base:</strong> {trip.originating_base_num}</p>
                    <p><strong>Request Datetime:</strong> {new Date(trip.request_datetime).toLocaleString()}</p>
                    <p><strong>Pickup Datetime:</strong> {new Date(trip.pickup_datetime).toLocaleString()}</p>
                    <p><strong>Dropoff Datetime:</strong> {new Date(trip.dropoff_datetime).toLocaleString()}</p>
                    <p><strong>PULocationID:</strong> {trip.PULocationID}</p>
                    <p><strong>DOLocationID:</strong> {trip.DOLocationID}</p>
                    <p><strong>Trip Miles:</strong> {trip.trip_miles}</p>
                    <p><strong>Trip Time:</strong> {trip.trip_time}</p>
                    <p><strong>Base Passenger Fare:</strong> ${trip.base_passenger_fare}</p>
                    <p><strong>Tolls:</strong> ${trip.tolls}</p>
                    <p><strong>BCF:</strong> ${trip.bcf}</p>
                    <p><strong>Sales Tax:</strong> ${trip.sales_tax}</p>
                    <p><strong>Driver Pay:</strong> ${trip.driver_pay}</p>
                    <p><strong>Shared Match Flag:</strong> {trip.shared_match_flag}</p>
                </div>
            )}
        </div>
    );
};

export default TripComponent;
