import React, { useEffect, useState } from "react";
import { getUserDetails } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import QRCodeGenerator from "./qrcode";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect if no token
        return;
      }

      try {
        const res = await getUserDetails(token);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 shadow-lg">
              <h1 className="text-2xl font-bold">QRPass</h1>
              
                
            

              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
            </nav>
    
      


      <QRCodeGenerator/>
    </div>
  );
};

export default Dashboard;
