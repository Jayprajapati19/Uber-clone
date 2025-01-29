import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    const fetchCaptain = async () => {
      if (!token) {
        navigate("/captain-login");
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setCaptain(response.data.captain);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error(error.message);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptain();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading spinner or placeholder
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
