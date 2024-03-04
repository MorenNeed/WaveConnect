import { createTheme } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976D2', // Dark Blue
        },
        secondary: {
            main: '#FFC107', // Amber
        },
        background: {
            default: '#FFFFFF', // White
            paper: '#FAFAFA', // Light Grey
        },
        text: {
            primary: '#333333', // Dark Grey
            secondary: '#757575', // Medium Grey
        },
        success: {
            main: '#4CAF50', // Green (Accent Color 1)
        },
        error: {
            main: '#F44336', // Red (Accent Color 2)
        },
        info: {
            main: '#9C27B0', // Purple (Accent Color 3)
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

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976D2', // Dark Blue
        },
        secondary: {
            main: '#FFC107', // Amber
        },
        background: {
            default: '#121212', // Dark background
            paper: '#1E1E1E', // Darker grey for paper
        },
        text: {
            primary: '#FFFFFF', // White text for better visibility
            secondary: '#BDBDBD', // Light grey text
        },
        success: {
            main: '#4CAF50', // Green (Accent Color 1)
        },
        error: {
            main: '#F44336', // Red (Accent Color 2)
        },
        info: {
            main: '#9C27B0', // Purple (Accent Color 3)
        },
        action: {
            hover: '#424242', // Darker grey for hover
            selected: '#616161', // Grey for selected state
            disabled: '#757575', // Light grey for disabled state
        },
    },
    typography: {
        fontFamily: "Montserrat, sans-serif",
    },
});

export type Theme = typeof lightTheme;

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: lightTheme,
    toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState(lightTheme);

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        if (localTheme) {
            setTheme(localTheme === "dark" ? darkTheme : lightTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme.palette.mode === "light" ? darkTheme : lightTheme;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme.palette.mode);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default CustomThemeProvider;