import React, { useEffect, useState } from 'react';
import { getRescueRequests } from '../services/api';

const RescueList = () => {
    const [rescueRequests, setRescueRequests] = useState([]);

    useEffect(() => {
        const fetchRescueRequests = async () => {
            const requests = await getRescueRequests();
            setRescueRequests(requests);
        };

        fetchRescueRequests();
    }, []);

    return (
        <div className="rescue-list">
            <h2>Active Rescue Requests</h2>
            <ul>
                {rescueRequests.map((request) => (
                    <li key={request.id}>
                        <h3>{request.title}</h3>
                        <p>{request.description}</p>
                        <p>Location: {request.location}</p>
                        <img src={request.image} alt="Rescue request" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RescueList;