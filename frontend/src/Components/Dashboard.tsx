import axios from "axios";
import AppBar from "./AppBar";
import Balance from "./Balance";
import Users from "./Users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default  function Dashboard() {

  const navigate = useNavigate();



  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }
        // headers body params 
        const resp = await axios.get("http://localhost:3000/api/v1/user/verify", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if(resp.data.message !== "User is logged in")
        {
          navigate("/");
        }
        
       
      } catch (error) {
        // Handle error (network error, server error, etc.)
        console.error("Error fetching verification:", error);
      }
    }

    fetchData();
  }, []);


  return (
    <div>
      <AppBar></AppBar>
      <Balance></Balance>
      <Users></Users>
    </div>
  )
}
