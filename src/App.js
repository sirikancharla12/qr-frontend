import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Register from "./components/register";
import Home from "./components/home";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
const App = () => {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) })] }) }) }));
};
export default App;
