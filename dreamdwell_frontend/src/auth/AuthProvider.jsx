import { createContext, useState, useEffect } from "react";

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // lowercase "loading"

    const login = (userData, token) => {
        setLoading(true);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setUser(userData);
        setLoading(false);
    };

    const logout = () => {
        setLoading(true);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            logout();
        }

        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading, // lowercase consistent
                login,
                logout,
                isAuthenticated: user !== null
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
