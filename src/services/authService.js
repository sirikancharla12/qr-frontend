var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;
export const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios.post(`${API_URL}/register`, { name, email, password });
});
export const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios.post(`${API_URL}/login`, { email, password });
});
export const getUserDetails = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios.get(`${API_URL}/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
});
