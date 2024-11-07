import React, { useState, useEffect } from 'react';

const useAlert = () => {
    const [alert, setAlert] = useState({ show: false, msg: '', color: '' });

    const showAlert = (color, msg) => {
        setAlert({ show: true, msg, color });

        // Automatically hide the alert after 3000 milliseconds (3 seconds)
        setTimeout(() => {
            setAlert({ show: false, msg: '', color: '' });
        }, 3000);
    };

    return { alert, showAlert };
};

const Alert = () => {
    const { alert } = useAlert();

    if (!alert.show) {
        return null;
    }

    return (
        <div role="alert" className={`fixed z-[100] w-fit right-1 top-[5rem] alert alert-success`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{alert.msg}</span>
        </div>
    );
};

export { useAlert, Alert };
