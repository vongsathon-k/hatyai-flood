import React, { useEffect, useState } from 'react';
import MapView from '../components/MapView';
import RescueList from '../components/RescueList';
import RequestForm from '../components/RequestForm';
import { fetchRescueRequests } from '../services/api';

const RescuerDashboard = () => {
    const [rescueRequests, setRescueRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRescueRequests = async () => {
            try {
                const requests = await fetchRescueRequests();
                setRescueRequests(requests);
            } catch (error) {
                console.error('Error fetching rescue requests:', error);
            } finally {
                setLoading(false);
            }
        };

        loadRescueRequests();
    }, []);

    return (
        <div className="rescuer-dashboard">
            <h1>Rescuer Dashboard</h1>
            {loading ? (
                <p>Loading rescue requests...</p>
            ) : (
                <>
                    <MapView rescueRequests={rescueRequests} />
                    <RescueList rescueRequests={rescueRequests} />
                    <RequestForm />
                </>
            )}
        </div>
    );
};

export default RescuerDashboard;