import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useContext } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const updateToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
        }
        else {
            localStorage.removeItem("token");
        }
    };
    return (_jsx(AuthContext.Provider, { value: { token, setToken: updateToken }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
