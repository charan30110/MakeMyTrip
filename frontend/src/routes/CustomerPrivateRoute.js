import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from "react-toastify";

function CustomerPrivateRoute() {
    const role = localStorage.getItem('role');
    const uname = localStorage.getItem('uname');

    useEffect(() => {
        if (!role || role.trim() !== 'customer') {
            toast.error("Not a customer", { position: 'top-right', autoClose: 2500 })
        } else if(!uname || uname.trim() === ''){
            toast.error("No username", { position: 'top-right', autoClose: 2500 })
        }
    })

    if (!role || !uname) {
        return <Navigate to="/" replace />
    }

    if (role.trim() !== 'customer') {
        const path = "/" + role.trim();
        return <Navigate to={path} replace />;
    }

    return <Outlet />;
}

export default CustomerPrivateRoute;