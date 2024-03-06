import React, { createContext, useContext, useEffect, useState } from "react";

interface MobileContextValue {
    isMobile: boolean;
    menuToggled: boolean;
    toggleMenuClick: () => void;
}

const MobileContext = createContext<MobileContextValue>({
    isMobile: false,
    menuToggled: false,
    toggleMenuClick: () => { },
});

export const useMobile = () => {
    return useContext(MobileContext);
};

const MobileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const [menuToggled, setMenuToggled] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMenuClick = () => {
        setMenuToggled(!menuToggled);
    };

    return (
        <MobileContext.Provider value={{ isMobile, menuToggled, toggleMenuClick }}>
            {children}
        </MobileContext.Provider>
    );
}

export default MobileProvider;