import React, { useState, useEffect } from 'react';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from 'axios';
import { srk } from "../names";

export const Dashboard = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${srk}/api/v1/user/rupee`,{
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
        setValue(response.data.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [value]); 

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={value} />
        <Users />
      </div>
    </div>
  );
};
