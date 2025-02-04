import React, { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Success } from "../components/Success";
import { Failure } from "../components/Failure";
import { srk } from "../names";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();

    const onClick = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${srk}/api/v1/user/login`, {
                username: email,
                password: password,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                setStatusMessage({ type: "success", text: "Login successful! Redirecting..." });

                setTimeout(() => navigate("/dashboard"), 1000);
            } else {
                setStatusMessage({ type: "error", text: "Login failed. Please check your credentials." });
            }
        } catch (error) {
            console.error("Login failed", error);
            setStatusMessage({
                type: "error",
                text: error.response?.data?.message || "Login failed. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        onChange={e => setEmail(e.target.value)}
                        placeholder=".....@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        label={"Password"}
                    />
                    <div className="pt-4">
                        <Button onClick={onClick} label={loading ? "Signing in..." : "Sign in"} disabled={loading} />
                    </div>
                    {/* Show Success or Failure Messages */}
                    {statusMessage.type === "success" && <Success message={statusMessage.text} />}
                    {statusMessage.type === "error" && <Failure message={statusMessage.text} />}
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
                </div>
            </div>
        </div>
    );
};
