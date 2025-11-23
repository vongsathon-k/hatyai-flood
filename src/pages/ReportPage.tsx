import React from 'react';
import RequestForm from '../components/RequestForm';
import MapView from '../components/MapView';

const ReportPage = () => {
    return (
        <div className="report-page">
            <h1>แจ้งน้ำท่วม</h1>
            <p>กรุณากรอกข้อมูลด้านล่างเพื่อแจ้งเหตุการณ์น้ำท่วมและขอความช่วยเหลือ</p>
            <RequestForm />
            <MapView />
        </div>
    );
};

export default ReportPage;