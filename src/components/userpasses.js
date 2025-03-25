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
import { getUserPasses } from "../services/passservice";
const UserPasses = ({ userId }) => {
    const [passes, setPasses] = useState([]);
    useEffect(() => {
        const fetchPasses = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield getUserPasses(userId);
                setPasses(res.data);
            }
            catch (error) {
                console.error("Error fetching passes", error);
            }
        });
        fetchPasses();
    }, [userId]);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Your Passes" }), passes.length === 0 ? (_jsx("p", { children: "No passes available" })) : (passes.map((pass) => (_jsxs("div", { children: [_jsxs("p", { children: ["Pass Details: ", pass.passDetails] }), _jsx("img", { src: pass.qrCode, alt: "QR Code" })] }, pass.id))))] }));
};
export default UserPasses;
