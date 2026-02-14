import React from 'react';
import CustomToast from './CustomToast';
import CustomConfirm from './CustomConfirm';

const NotificationContainer: React.FC = () => {
    return (
        <>
            <CustomToast />
            <CustomConfirm />
        </>
    );
};

export default NotificationContainer;
