import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext, { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const {user, setUser} = React.useContext(UserDataContext)
  console.log(user)

  const submitHandler = async(e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      password: password,
      email: email,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status === 201){
      const data = response.data;

      setUser(data.user);
      localStorage.setItem('token', data.token);
      
      navigate('/home');
    }

    setEmail("");
    setPassword("");
    setLastName("");
    setFirstName("");
  };

  return (
    <div>
      <div className="p-7 flex flex-col justify-between h-screen">
        <div>
          <img
            className="w-16 mb-10 mix-blend-darken"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="uber logo"
          />
          <form onSubmit={(e) => submitHandler(e)}>
            <h3 className="text-lg font-medium mb-2">
              What&apos;s your name ?
            </h3>

            <div className="flex gap-4 mb-6">
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="firstname"
                className="bg-[#eeeeee] w-1/2 outline-none rounded px-4 py-2 border text-lg placeholder:text-base"
              />
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="lastname"
                className="bg-[#eeeeee] w-1/2 outline-none rounded px-4 py-2 border text-lg placeholder:text-base"
              />
            </div>

            <h3 className="text-lg font-medium mb-2">
              What&apos;s your email ?
            </h3>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email@example.com"
              className="bg-[#eeeeee] outline-none mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input
              className="bg-[#eeeeee] outline-none mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
              Create account
            </button>
          </form>
          <p className="text-center">
            Already have a account?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px]">
            This site is protected by reCAPTCHA and the <span className="underline cursor-pointer">Google Privacy Policy</span> and <span className="underline cursor-pointer">Terms of Service apply</span> .
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
