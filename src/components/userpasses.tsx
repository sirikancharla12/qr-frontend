import React, { useEffect, useState } from "react";
import { getUserPasses } from "../services/passservice";
import axios,{ AxiosResponse } from "axios";

interface Pass {
  id: number;
  passDetails: string;
  qrCode: string;
}

const UserPasses: React.FC<{ userId: number }> = ({ userId }) => {
  const [passes, setPasses] = useState<Pass[]>([]);

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const res: AxiosResponse<Pass[]> = await getUserPasses(userId);
        setPasses(res.data);
      } catch (error) {
        console.error("Error fetching passes", error);
      }
    };

    fetchPasses();
  }, [userId]);

  return (
    <div>
      <h2>Your Passes</h2>
      {passes.length === 0 ? (
        <p>No passes available</p>
      ) : (
        passes.map((pass) => (
          <div key={pass.id}>
            <p>Pass Details: {pass.passDetails}</p>
            <img src={pass.qrCode} alt="QR Code" />
          </div>
        ))
      )}
    </div>
  );
};

export default UserPasses;
