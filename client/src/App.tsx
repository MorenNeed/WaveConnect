import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import { PrivateRoute, PublicRoute } from "./routes/route";
import Inbox from "./pages/Inbox";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthProvider from "./hooks/AuthProvider";
import UsersProvider from "./hooks/UsersProvider";
import ConversationProvider from "./hooks/ConversationsProvider";
import MessagesProvider from "./hooks/MessagesProvider";
import CustomThemeProvider, { useTheme } from "./hooks/CustomThemeProvider";




const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <StyledEngineProvider injectFirst>
            <AuthProvider>
                <UsersProvider>
                    <ConversationProvider>
                        <MessagesProvider>
                            <CustomThemeProvider>
                                <ThemeProvider theme={theme}>
                                    {children}
                                </ThemeProvider>
                            </CustomThemeProvider>
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