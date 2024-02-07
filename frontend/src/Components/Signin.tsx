import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
    
    async function handleClick()
    {
        const resp = await axios.post("http://localhost:3000/api/v1/user/signin" , {
            username:email,
            password:password
        })
        console.log(resp);
        console.log(resp.data);
        if(resp.data.message === "Login successfull")
        {
            localStorage.setItem('token',resp.data.token );
            navigate("/dashboard");
        }
    }

  return (
    <div className="flex flex-row justify-center">
        <div className="bg-neutral-800 w-full h-full fixed top-0 left-0 z-0"></div>
        <div className="border-2 border-slate-200 rounded-lg shadow-2xl z-10 bg-white mt-32">
            <div className="flex flex-row justify-center">
                <div className="text-2xl font-bold pt-2">Sign In</div>
            </div>
            <div className="text-slate-500 flex flex-row justify-center mt-2 mx-8">
                <div>
                    Enter your credentials to access your
                    <div className="text-slate-500 flex flex-row justify-center">account</div>
                </div>
            </div>
            <div className="mx-4 mt-8">
                <div>
                    <div className="font-bold mb-2 mt-4">Email</div>
                    <input type="email" placeholder="Enter your email" className="border-2 rounded w-full p-1" required onChange={(event) => setEmail(event.target.value)}></input>
                </div>
                <div>
                    <div className="font-bold mb-2 mt-4">Password</div>
                    <input type="password" placeholder="Enter your password" className="border-2 rounded w-full p-1" required onChange={(event) => setPassword(event.target.value)}></input>
                </div>
                <div>
                    <button className="bg-black text-white rounded w-full p-2 my-4" onClick={handleClick}>Sign In</button>
                </div>
                <div className="flex flex-row justify-center mt-2 mb-4">
                    Dont have an acccount?  <Link to="/signup" className="underline"> Sign Up</Link>
                </div>
            </div> 
        </div>
        
    </div>
  )
  
}
