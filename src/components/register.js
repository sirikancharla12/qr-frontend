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
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleRegister = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        try {
            yield registerUser(name, email, password);
            navigate("/dashboard");
        }
        catch (error) {
            alert(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Registration failed!");
        }
    });
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-lg shadow-lg p-6 sm:p-8", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center text-gray-900", children: "Register" }), _jsx("p", { className: "text-gray-500 text-center mb-6", children: "Create a new account to get started" }), _jsxs("form", { onSubmit: handleRegister, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Full Name" }), _jsx("input", { id: "name", type: "text", placeholder: "John Doe", value: name, onChange: (e) => setName(e.target.value), className: "w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }), _jsx("input", { id: "email", type: "email", placeholder: "your@email.com", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsx("input", { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none", required: true })] }), _jsx("button", { type: "submit", className: "w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300", children: "Register" })] }), _jsxs("p", { className: "mt-6 text-center text-sm text-gray-600", children: ["Already have an account?", " ", _jsx("a", { href: "/login", className: "text-blue-500 hover:underline", children: "Login" })] })] }) }));
};
export default Register;
