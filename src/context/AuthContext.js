
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser && savedUser !== "undefined") {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("currentUser", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);