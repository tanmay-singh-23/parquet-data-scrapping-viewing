// frontend/src/TotalPerLocationComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Assuming you have Font Awesome installed

const TotalPerLocationComponent = () => {
    const [locationTotals, setLocationTotals] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchTotalTripsPerLocation = async () => {
            try {
                const response = await axios.get('http://localhost:8000/trips/totalPerLocation');
                if (response && response.data) {
                    setLocationTotals(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading state to false after fetching data
            }
        };

        fetchTotalTripsPerLocation();
    }, []);

    return (
        <div className="total-per-location-container">
            <h2>Total Trips per Location</h2>
            {loading ? (
                <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                    <p>Loading...</p>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Location ID</th>
                            <th>Total Trips</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locationTotals.map((total) => (
                            <tr key={total._id}>
                                <td>{total._id}</td>
                                <td>{total.totalTrips}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TotalPerLocationComponent;
