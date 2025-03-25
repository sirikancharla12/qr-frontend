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
import { useState, useEffect } from "react";
import QRCodeLib from "qrcode";
import axios from "axios";
import locationIcon from "../assets/location.svg";
import personicon from "../assets/person.svg";
import calendericon from "../assets/calender.svg";
import downlaod from "../assets/download.svg";
import eyeicon from "../assets/eye.svg";
const eventOptions = {
    "Tech Conference": {
        price: "₹499",
        date: "2025-05-10",
        location: "New Delhi, India",
    },
    "Music Fest": {
        price: "₹999",
        date: "2025-06-15",
        location: "Mumbai, India",
    },
    "Art Exhibition": {
        price: "₹299",
        date: "2025-07-20",
        location: "Bangalore, India",
    },
    "Sports Gala": {
        price: "₹799",
        date: "2025-08-05",
        location: "Kolkata, India",
    },
};
const getRandomColor = () => {
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-purple-500",
        "bg-indigo-900",
        "bg-orange-500",
        "bg-teal-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
const QRCodeGenerator = () => {
    // Form states
    const [userName, setUserName] = useState("");
    const [eventDetails, setEventDetails] = useState("");
    const [price, setPrice] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [location, setLocation] = useState("");
    const [randomBgColor, setRandomBgColor] = useState("bg-indigo-900");
    const [myPasses, setMyPasses] = useState([]);
    const [generatedPass, setGeneratedPass] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token)
            return;
        const userId = localStorage.getItem("userId");
        axios
            .get(`${import.meta.env.VITE_API_URL}/pass/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
            setMyPasses(res.data);
        })
            .catch((err) => {
            console.error("Error fetching passes:", err);
        });
    }, []);
    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                // Timeout callback (empty as per your code)
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showModal]);
    const handleEventChange = (selectedEvent) => {
        setEventDetails(selectedEvent);
        if (eventOptions[selectedEvent]) {
            setPrice(eventOptions[selectedEvent].price);
            setEventDate(eventOptions[selectedEvent].date);
            setLocation(eventOptions[selectedEvent].location);
        }
        else {
            setPrice("");
            setEventDate("");
            setLocation("");
        }
    };
    const handleGenerateQR = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!userName || !eventDetails) {
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        try {
            const qrData = `https://myapp.com/user/${userName}`;
            const generatedQrCode = yield QRCodeLib.toDataURL(qrData);
            const newPass = {
                name: userName,
                passDetails: eventDetails,
                price,
                date: eventDate,
                location,
                qrCode: generatedQrCode,
            };
            setGeneratedPass(newPass);
            setShowModal(true);
            const payload = {
                name: userName,
                passDetails: eventDetails,
                qrCode: generatedQrCode,
                location,
                date: eventDate,
            };
            yield axios.post(`${import.meta.env.VITE_API_URL}/pass/create`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setMyPasses((prev) => [...prev, newPass]);
        }
        catch (error) {
            console.error("Error generating pass:", error);
        }
    });
    const handleViewPass = (pass) => {
        setGeneratedPass(pass);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            setGeneratedPass(null);
        }, 5000);
    };
    const handleDownloadQR = (qrCodeUrl, fileName) => {
        if (!qrCodeUrl) {
            console.error("QR Code URL is missing!");
            return;
        }
        const link = document.createElement("a");
        link.href = qrCodeUrl;
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100 p-6", children: [_jsx("div", { className: `mx-auto max-w-6xl transition-all duration-300 ${showModal ? "blur-sm" : ""}`, children: _jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsxs("div", { className: "flex-1 bg-white h-max p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "\uD83C\uDF9F\uFE0F Generate QR Code Pass" }), _jsx("input", { type: "text", placeholder: "Enter your name", value: userName, onChange: (e) => setUserName(e.target.value), className: "w-full mb-3 px-4 py-2 border border-gray-300 rounded-md" }), _jsxs("select", { value: eventDetails, onChange: (e) => handleEventChange(e.target.value), className: "w-full mb-3 px-4 py-2 border border-gray-300 rounded-md", children: [_jsx("option", { value: "", children: "Select an event" }), Object.keys(eventOptions).map((event) => (_jsx("option", { value: event, children: event }, event)))] }), eventDetails && (_jsxs("div", { className: "mb-3 w-full bg-yellow-100 border border-gray-300 rounded-lg shadow-md", children: [_jsx("div", { className: "bg-orange-500 text-white px-4 py-2 rounded-t-lg", children: _jsx("h3", { className: "text-lg font-semibold", children: "Event Details" }) }), _jsxs("div", { className: "p-4 space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("p", { className: "font-medium", children: ["\uD83C\uDF9F\uFE0F ", eventDetails] }), _jsxs("p", { children: ["\uD83D\uDCC5 ", eventDate] })] }), _jsxs("p", { children: ["\uD83D\uDCCD ", location] }), _jsxs("p", { className: "font-bold text-lg", children: ["\uD83D\uDCB0 ", price] })] })] })), _jsx("button", { onClick: handleGenerateQR, className: "w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300", children: "Generate QR Code Pass" })] }), _jsxs("div", { className: "flex-1 bg-white p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-2", children: "Your Passes" }), _jsx("p", { className: "text-gray-500 mb-4", children: "View all your generated passes" }), myPasses.length === 0 ? (_jsx("p", { className: "text-gray-600", children: "No passes generated yet." })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: myPasses.slice(0, 2).map((passData, index) => (_jsxs("div", { className: "border border-gray-300 rounded-lg shadow mb-4", children: [_jsxs("div", { className: "bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Event Pass" }), _jsx("span", { className: "font-bold", children: passData.price })] }), _jsxs("div", { className: "p-4 flex flex-col md:flex-row items-center", children: [_jsxs("div", { className: "text-left space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDC64 Attendee:" }), " ", passData.name] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83C\uDF9F\uFE0F Event:" }), " ", passData.passDetails] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDCC5 Date:" }), " ", passData.date] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDCCD Location:" }), " ", passData.location] })] }), _jsx("div", { className: "w-40 h-40 flex items-center justify-center p-2 rounded-lg mb-4 md:mb-0 md:mr-4", children: _jsx("img", { src: passData.qrCode, alt: "QR Code", className: "w-[50%] h-[50%]" }) })] }), _jsxs("div", { className: "flex gap-2 mt-4", children: [_jsxs("button", { onClick: () => handleViewPass(passData), className: "w-1/2 px-6 flex justify-center items-center gap-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-300 text-sm", children: [_jsx("img", { src: eyeicon, alt: "", className: "w-5 h-5" }), "View Pass"] }), _jsxs("button", { onClick: () => handleDownloadQR(passData.qrCode, `${passData.name}_Pass`), className: "w-1/2  p-2 flex justify-center items-center gap-2  bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 text-sm", children: [_jsx("img", { src: downlaod, alt: "", className: "w-5 h-5" }), "Download Pass"] })] })] }, index))) }))] })] }) }), showModal && generatedPass && (_jsx("div", { className: "fixed inset-0 flex justify-center items-center backdrop-blur-gray-800", children: _jsxs("div", { className: "relative w-11/12 max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col md:flex-row h-[50%]", children: [_jsx("div", { className: "bg-black text-white w-full md:w-1/3 p-6 rounded-t-lg md:rounded-l-lg flex flex-col justify-center items-center", children: _jsx("div", { className: "w-40 h-40 border border-gray-300 p-2 rounded-lg shadow-lg mb-4", children: _jsx("img", { src: generatedPass.qrCode, alt: "QR Code", className: "w-full h-full" }) }) }), _jsxs("div", { className: "w-full md:w-2/3 p-6 flex flex-col items-center relative", children: [_jsx("button", { onClick: () => setShowModal(false), className: "absolute top-4 right-4 text-gray-500 hover:text-red-500", children: "\u2716\uFE0F" }), _jsxs("div", { className: "pt-2 space-y-4", children: [_jsx("h1", { className: "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-center", children: generatedPass.passDetails }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: personicon, alt: "Person", className: "w-5 h-5" }), _jsx("p", { className: "text-lg text-gray-700 font-semibold", children: generatedPass.name })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: calendericon, alt: "Calendar", className: "w-5 h-5" }), _jsx("p", { className: "text-lg text-gray-700 font-semibold", children: generatedPass.date })] })] }), _jsxs("div", { className: "flex items-center gap-2 justify-center", children: [_jsx("img", { src: locationIcon, alt: "Location", className: "w-5 h-5" }), _jsx("p", { className: "text-lg text-gray-700", children: generatedPass.location })] }), _jsx("div", { className: "text-center mt-2", children: _jsx("p", { className: "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-purple-500", children: generatedPass.price }) })] }), _jsxs("button", { onClick: () => generatedPass &&
                                        handleDownloadQR(generatedPass.qrCode, `${generatedPass.name}_Pass`), className: "w-full mt-4 px-6 py-3 bg-slate-400 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 flex justify-center items-center gap-2", children: [_jsx("img", { src: downlaod, alt: "", className: "w-5 h-5" }), "Download Pass"] })] })] }) }))] }));
};
export default QRCodeGenerator;
