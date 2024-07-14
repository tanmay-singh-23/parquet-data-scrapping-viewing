// frontend/src/GroupedDataComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const GroupedDataComponent = () => {
    const [groupedData, setGroupedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroupedData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/trips/groupeddata');
                if (response && response.data) {
                    setGroupedData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        };

        fetchGroupedData();
    }, []);

    return (
        <div className="grouped-data-container">
            <h2>Grouped Data</h2>
            {loading ? (
                <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                    <p>Loading...</p>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th>Total Trips</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedData.map((group) => (
                            <tr key={group._id}>
                                <td>{group._id}</td>
                                <td>{group.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GroupedDataComponent;
