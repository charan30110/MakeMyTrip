import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

function PrivateRoute() {

    const navigate = useNavigate();
    const [cookies, , removeCookies] = useCookies();

    const [isToastShown, setIsToastShown] = useState(false);
    const isLoggingOut = localStorage.getItem('isLoggingOut')

    useEffect(() => {
        if (!cookies.jwt || !cookies.jwt.trim()) {
            console.log(isLoggingOut)
            if (!isToastShown && !isLoggingOut) {
                toast.error('Not Authorized', { position: 'top-right', autoClose: 2500 });
                setIsToastShown(true);
            }
            removeCookies('jwt')
            navigate('/');
        }
    }, [navigate, cookies.jwt, removeCookies, isToastShown, isLoggingOut])

    return (
        <>
            {cookies.jwt ? <Outlet /> : null}
        </>
    );
}

export default PrivateRoute;
