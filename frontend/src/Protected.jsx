import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from './utils/axionsInstance';

const Protected = () => {
    const [isAuth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('/isverified'

                );

                if (res.status === 200 && res.data?.user) {

                    setAuth(true);
                } else {

                    setAuth(false);
                }
            } catch (err) {

                setAuth(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuth === null) return <div>Loading...</div>;

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protected;
