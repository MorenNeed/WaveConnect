import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { StyledEngineProvider, createTheme } from '@mui/material/styles';
import { PrivateRoute, PublicRoute } from "./routes/route";
import Inbox from "./pages/Inbox";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthProvider from "./hooks/AuthProvider";
import UsersProvider from "./hooks/UsersProvider";
import ConversationProvider from "./hooks/ConversationsProvider";
import MessagesProvider from "./hooks/MessagesProvider";
import MobileProvider from "./hooks/MobileProvider";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000', // Black
        },
        secondary: {
            main: '#FFFFFF', // White
        },
        background: {
            default: '#FFFFFF', // White
            paper: '#FAFAFA', // Light Grey
        },
        text: {
            primary: '#000000', // Black
            secondary: '#757575', // Medium Grey
        },
        success: {
            main: '#4CAF50', // Green (Accent Color 1)
        },
        error: {
            main: '#F44336', // Red (Accent Color 2)
        },
        info: {
            main: '#2196F3', // Blue (Accent Color 3)
        },
        action: {
            hover: '#E0E0E0', // Light Grey (Neutral Color 1)
            selected: '#BDBDBD', // Medium Grey (Neutral Color 2)
            disabled: '#9E9E9E', // Dark Grey (Neutral Color 3)
        },
    },
    typography: {
        fontFamily: "Montserrat, sans-serif",
    },
});



const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <StyledEngineProvider injectFirst>
            <AuthProvider>
                <UsersProvider>
                    <ConversationProvider>
                        <MessagesProvider>
                            <MobileProvider>
                                <ThemeProvider theme={theme}>
                                    {children}
                                </ThemeProvider>
                            </MobileProvider>
                        </MessagesProvider>
                    </ConversationProvider>
                </UsersProvider>
            </AuthProvider>
        </StyledEngineProvider>
    );
};

const App: React.FC = () => {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Inbox />} />
                    </Route>
                    <Route element={<PublicRoute />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
};

const AppWithProviders: React.FC = () => {
    return (
        <AppProviders>
            <App />
        </AppProviders>
    );
};

export default AppWithProviders;