var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        try {
            const res = yield loginUser(email, password);
            setToken(res.data.token);
            navigate("/dashboard");
        }
        catch (error) {
            alert(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Login failed!");
        }
    });
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "bg-white p-6 sm:p-8 shadow-lg rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-2 text-center", children: "Login" }), _jsx("p", { className: "text-sm text-gray-500 mb-6 text-center", children: "Enter your credentials to access your account" }), _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "your@email.com", required: true, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "********", required: true, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" })] }), _jsx("button", { type: "submit", className: "w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300", children: "Login" })] }), _jsxs("p", { className: "text-sm text-gray-500 mt-4 text-center", children: ["Don\u2019t have an account?", " ", _jsx("a", { href: "/register", className: "text-indigo-600 hover:underline font-medium", children: "Register" })] })] }) }));
};
export default Login;
