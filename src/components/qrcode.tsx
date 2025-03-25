import React, { useState, useEffect } from "react"
import QRCodeLib from "qrcode"
import axios from "axios"
import locationIcon from "../assets/location.svg"
import personicon from "../assets/person.svg"
import calendericon from "../assets/calender.svg"
import downlaod from "../assets/download.svg"
import eyeicon from "../assets/eye.svg"

const eventOptions: {
  [key: string]: { price: string; date: string; location: string }
} = {
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
}

interface PassData {
  id?: number
  name: string
  passDetails: string
  price: string
  date: string
  location: string
  qrCode: string
}

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
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const QRCodeGenerator: React.FC = () => {
  // Form states
  const [userName, setUserName] = useState("")
  const [eventDetails, setEventDetails] = useState("")
  const [price, setPrice] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [location, setLocation] = useState("")
  const [randomBgColor, setRandomBgColor] = useState("bg-indigo-900")
  const [myPasses, setMyPasses] = useState<PassData[]>([])
  const [generatedPass, setGeneratedPass] = useState<PassData | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    const userId = localStorage.getItem("userId")

    axios
      .get(`${import.meta.env.VITE_API_URL}/pass/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMyPasses(res.data)
      })
      .catch((err) => {
        console.error("Error fetching passes:", err)
      })
  }, [])

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        // Timeout callback (empty as per your code)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showModal])

  const handleEventChange = (selectedEvent: string) => {
    setEventDetails(selectedEvent)
    if (eventOptions[selectedEvent]) {
      setPrice(eventOptions[selectedEvent].price)
      setEventDate(eventOptions[selectedEvent].date)
      setLocation(eventOptions[selectedEvent].location)
    } else {
      setPrice("")
      setEventDate("")
      setLocation("")
    }
  }

  const handleGenerateQR = async () => {
    if (!userName || !eventDetails) {
      return
    }
    const token = localStorage.getItem("token")
    if (!token) {
      return
    }

    try {
      const qrData = `https://myapp.com/user/${userName}`
      const generatedQrCode = await QRCodeLib.toDataURL(qrData)

      const newPass: PassData = {
        name: userName,
        passDetails: eventDetails,
        price,
        date: eventDate,
        location,
        qrCode: generatedQrCode,
      }

      setGeneratedPass(newPass)
      setShowModal(true)

      const payload = {
        name: userName,
        passDetails: eventDetails,
        qrCode: generatedQrCode,
        location,
        date: eventDate,
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/pass/create`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      setMyPasses((prev) => [...prev, newPass])
    } catch (error) {
      console.error("Error generating pass:", error)
    }
  }

  const handleViewPass = (pass: PassData) => {
    setGeneratedPass(pass)
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
      setGeneratedPass(null)
    }, 5000)
  }

  const handleDownloadQR = (qrCodeUrl: string, fileName: string) => {
    if (!qrCodeUrl) {
      console.error("QR Code URL is missing!")
      return
    }

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `${fileName}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div
        className={`mx-auto max-w-6xl transition-all duration-300 ${
          showModal ? "blur-sm" : ""
        }`}
      >
        {/* On mobile, "Generate" section appears on top, then "Your Passes" */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Generate QR Code Pass Section */}
          <div className="flex-1 bg-white h-max p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎟️ Generate QR Code Pass
            </h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
            />
            <select
              value={eventDetails}
              onChange={(e) => handleEventChange(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select an event</option>
              {Object.keys(eventOptions).map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>

            {eventDetails && (
              <div className="mb-3 w-full bg-yellow-100 border border-gray-300 rounded-lg shadow-md">
                <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg">
                  <h3 className="text-lg font-semibold">Event Details</h3>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">🎟️ {eventDetails}</p>
                    <p>📅 {eventDate}</p>
                  </div>
                  <p>📍 {location}</p>
                  <p className="font-bold text-lg">💰 {price}</p>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerateQR}
              className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Generate QR Code Pass
            </button>
          </div>

          {/* Your Passes Section */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Passes</h2>
            <p className="text-gray-500 mb-4">View all your generated passes</p>

            {myPasses.length === 0 ? (
              <p className="text-gray-600">No passes generated yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myPasses.slice(0, 2).map((passData, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg shadow mb-4"
                  >
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Event Pass</h3>
                      <span className="font-bold">{passData.price}</span>
                    </div>
                    <div className="p-4 flex flex-col md:flex-row items-center">
                      <div className="text-left space-y-2">
                        <p>
                          <strong>👤 Attendee:</strong> {passData.name}
                        </p>
                        <p>
                          <strong>🎟️ Event:</strong> {passData.passDetails}
                        </p>
                        <p>
                          <strong>📅 Date:</strong> {passData.date}
                        </p>
                        <p>
                          <strong>📍 Location:</strong> {passData.location}
                        </p>
                      </div>
                      <div className="w-40 h-40 flex items-center justify-center p-2 rounded-lg mb-4 md:mb-0 md:mr-4">
                        <img
                          src={passData.qrCode}
                          alt="QR Code"
                          className="w-[50%] h-[50%]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleViewPass(passData)}
                        className="w-1/2 px-6 flex justify-center items-center gap-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-300 text-sm"
                      >
                        <img src={eyeicon} alt="" className="w-5 h-5" />
                        View Pass
                      </button>
                      <button
                        onClick={() =>
                          handleDownloadQR(passData.qrCode, `${passData.name}_Pass`)
                        }
                        className="w-1/2  p-2 flex justify-center items-center gap-2  bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 text-sm"
                      >
                        <img src={downlaod} alt="" className="w-5 h-5" />
                        Download Pass
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Generated Pass */}
      {showModal && generatedPass && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-gray-800">
          <div className="relative w-11/12 max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col md:flex-row h-[50%]">
            <div className="bg-black text-white w-full md:w-1/3 p-6 rounded-t-lg md:rounded-l-lg flex flex-col justify-center items-center">
              <div className="w-40 h-40 border border-gray-300 p-2 rounded-lg shadow-lg mb-4">
                <img
                  src={generatedPass.qrCode}
                  alt="QR Code"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3 p-6 flex flex-col items-center relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                ✖️
              </button>

              <div className="pt-2 space-y-4">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-center">
                  {generatedPass.passDetails}
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <img src={personicon} alt="Person" className="w-5 h-5" />
                    <p className="text-lg text-gray-700 font-semibold">
                      {generatedPass.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={calendericon} alt="Calendar" className="w-5 h-5" />
                    <p className="text-lg text-gray-700 font-semibold">
                      {generatedPass.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <img src={locationIcon} alt="Location" className="w-5 h-5" />
                  <p className="text-lg text-gray-700">{generatedPass.location}</p>
                </div>
                <div className="text-center mt-2">
                  <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-purple-500">
                    {generatedPass.price}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  generatedPass &&
                  handleDownloadQR(generatedPass.qrCode, `${generatedPass.name}_Pass`)
                }
                className="w-full mt-4 px-6 py-3 bg-slate-400 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 flex justify-center items-center gap-2"
              >
                <img src={downlaod} alt="" className="w-5 h-5" />
                Download Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QRCodeGenerator
