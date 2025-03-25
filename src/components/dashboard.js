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
import { useEffect, useState } from "react";
import { getUserDetails } from "../services/authService";
import { useNavigate } from "react-router-dom";
import QRCodeGenerator from "./qrcode";
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserDetails = () => __awaiter(void 0, void 0, void 0, function* () {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login"); // Redirect if no token
                return;
            }
            try {
                const res = yield getUserDetails(token);
                setUser(res.data);
            }
            catch (error) {
                console.error("Error fetching user details:", error);
                localStorage.removeItem("token");
                navigate("/login");
            }
        });
        fetchUserDetails();
    }, [navigate]);
    if (!user) {
        return _jsx("h2", { children: "Loading..." });
    }
    return (_jsxs("div", { children: [_jsxs("nav", { className: "flex justify-between items-center px-8 py-4 shadow-lg", children: [_jsx("h1", { className: "text-2xl font-bold", children: "QRPass" }), _jsx("button", { className: "bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300", onClick: () => {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }, children: "Logout" })] }), _jsx(QRCodeGenerator, {})] }));
};
export default Dashboard;
