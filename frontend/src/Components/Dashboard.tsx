import axios from "axios";
import AppBar from "./AppBar";
import Balance from "./Balance";
import Users from "./Users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default  function Dashboard() {

  const navigate = useNavigate();
  const [balance,setBalance] = useState<number>(0);
  const [firstName,setFirstName] = useState<string>("");

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
          return;
        }
        else
        {
          const res1 = await axios.post("http://localhost:3000/api/v1/account/balance" , {
            userId:resp.data.userId
          });

          setBalance(res1.data.balance);

          const res2 = await axios.post("http://localhost:3000/api/v1/user/me" , {
            userId:resp.data.userId
          })

          setFirstName(res2.data.firstName);
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
      <AppBar firstName={firstName}></AppBar>
      <Balance balance={balance} ></Balance>
      <Users></Users>
    </div>
  )
}
