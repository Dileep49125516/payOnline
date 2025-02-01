import React, { useState } from "react";
import kbPay from "../assets/kbpay.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { srk } from "../names"; 

const EditProfile = ({ onClose, setImageUrl, setProfile }) => {
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [photo, setPhoto] = useState(null); 
    const navigate = useNavigate();

    const onSave = async () => {
        const formData = new FormData();
        formData.append("password", password);
        formData.append("firstName", fname);
        formData.append("lastName", lname);
        if (photo) formData.append("photo", photo); 

        try {
            const response = await axios.put(`${srk}/api/v1/user/update`, formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data", 
                },
            });
            const imageUrl = response.data.photoPath;  
            const profile = response.data.profile; 

            console.log("Image URL:", imageUrl);
            console.log("Profile Data:", profile);

            setImageUrl(imageUrl);  
            setProfile(profile);  
            onClose();  
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again."); 
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold">Edit Profile</h2>
            <input
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                type="text"
                placeholder="First Name"
                className="border p-2 w-full mb-2"
            />
            <input
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                type="text"
                placeholder="Last Name"
                className="border p-2 w-full mb-2"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-2"
            />
            <input
                onChange={(e) => setPhoto(e.target.files[0])}
                type="file"
                className="border p-2 w-full mb-2"
            />
            <div className="flex">
                <button onClick={onSave} className="bg-blue-500 text-white p-2 rounded">Save</button>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                }} className="bg-blue-500 text-white p-2 ml-3 rounded">LogOut</button>
            </div>
        </div>
    );
};

export const Appbar = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState(""); 
    const [profile, setProfile] = useState(""); 
    const navigate = useNavigate();

    const handleImageClick = () => {
        setIsEditing((prev) => !prev);
    };

    const onClose = () => {
        setIsEditing(false);
    };

    return (
        <div className="shadow h-20 flex justify-between">
            <div className="flex justify-center h-full ml-4 font-bold">
                <img src={kbPay} className="rounded-lg h-full w-60%" alt="KB Pay Logo" />
                <span className="pl-3 text-blue-950">
                    <ul>
                        <li>Use</li>
                        <li>Send Money</li>
                        <li>Receive Money</li>
                    </ul>
                </span>
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello {profile || "User"} 
                </div>
                <button onClick={handleImageClick}>
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <img src={imageUrl || "/path/to/default/image.jpg"} alt="Profile" className="rounded-full h-full w-full object-cover" />
                    </div>
                </button>
            </div>

            {isEditing && (
                <div className="absolute top-16 right-4">
                    <EditProfile onClose={onClose} setImageUrl={setImageUrl} setProfile={setProfile} />
                </div>
            )}
        </div>
    );
};
