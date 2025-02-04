import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Success } from "../components/Success";
import { Failure } from "../components/Failure";
import axios from "axios";
import { srk } from "../names";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${srk}/api/v1/user/signup`, {
        firstName,
        lastName,
        username,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setStatusMessage({ type: "success", text: "Signup Successful! Redirecting..." });

        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        setStatusMessage({ type: "error", text: "Signup failed. Please try again." });
      }
    } catch (error) {
      console.error("Sign up failed", error);
      setStatusMessage({
        type: "error",
        text: error.response?.data?.message || "Signup failed. Try again later.",
      });
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" label="First Name" />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" label={"Last Name"} />
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="......@gmail.com" label={"Email"} />
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="Password" label={"Password"} />
          
          <div className="pt-4">
            <Button onClick={handleSignUp} label={"Sign up"} />
          </div>

          {statusMessage.type === "success" && <Success message={statusMessage.text} />}
          {statusMessage.type === "error" && <Failure message={statusMessage.text} />}

          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};
