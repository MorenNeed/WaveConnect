import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

// If user already loggen in and tries to access the login page, redirect to the inbox page
// If user is not logged in and tries to access the inbox page, redirect to the login page
export const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export const PublicRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}