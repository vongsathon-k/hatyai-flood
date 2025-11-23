import React from 'react';
import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import RescueList from '../components/RescueList';
import RequestForm from '../components/RequestForm';

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <h1>Welcome to the Hatyai Flood Rescue System</h1>
            <p>Please report any flooding incidents and request assistance.</p>
            <MapView />
            <RequestForm />
            <RescueList />
        </div>
    );
};

export default HomePage;