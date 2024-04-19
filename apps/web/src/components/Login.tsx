import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../config";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onclick = async () => {
    const response = await axios.post(`${URL}/user/signin`, {
      email: email,
      password: password,
    });
    console.log(response);
    if (response.data.token) {
      localStorage.setItem("token", `Bearer ` + response.data.token);
      navigate("/");
    }
  };
  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="flex flex-col justify-center items-center h-96 w-96">
          <div className="flex flex-col p-40 space-y-5 justify-center rounded-lg items-center w-full bg-gray-200 h-36">
            <div className="flex flex-col space-y-5">
              <label className="">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border-black rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col space-y-5">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border-black rounded-lg p-2"
              />
            </div>
            <div>
              <button className="bg-blue-500 rounded-lg p-3" onClick={onclick}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
