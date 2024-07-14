import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const AverageFarePerLocationComponent = () => {
    const [locationAverages, setLocationAverages] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        const fetchAverageFarePerLocation = async () => {
            try {
                const response = await axios.get('http://localhost:8000/trips/averagefareperlocation');
                if (response && response.data) {
                    setLocationAverages(response.data);
                    setLoading(false); // Turn off loading indicator on successful data fetch
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Turn off loading indicator on error
            }
        };

        fetchAverageFarePerLocation();
    }, []);

    return (
        <div className="average-fare-per-location-container">
            <h2>Average Fare per Location</h2>
            {loading ? (
                <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} size="3x" spin /> Loading...
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Location ID</th>
                            <th>Average Fare</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locationAverages.map((average) => (
                            <tr key={average._id}>
                                <td>{average._id}</td>
                                <td>${average.averageFare.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AverageFarePerLocationComponent;
