import React, { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { srk } from "../names";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); 
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
                navigate("/dashboard");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed. Please try again.");
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
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
                </div>
            </div>
        </div>
    );
};
