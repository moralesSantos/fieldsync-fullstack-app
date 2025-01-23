import React, { useState } from "react";
import { useUserContext } from "../UserContext";
import axios from "axios";
import "./SavePage.css";

const SavePage = () => {
  const { users, message, setMessage } = useUserContext();
  const [loading, setLoading] = useState(false);

  //Fuction to save users to backend 
  const saveUsers = async () => {
    if (!users || users.length === 0) {
      //prevents saving if there are no availble users
      setMessage("Failed to save, no users are available. Download users first.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4500/save", { users });
      setMessage(response.data.message); //update message with response from api
    } catch (err) {
      console.error("Error saving users: ", err);
      setMessage("Failed to save users. Try again.");
    } finally {
      setLoading(false); //reset loading state
    }
  };

  return (
    <div className="page save-page">
      <h1 className="title">Save Page</h1>
      {/* Button to call the save operation */}
      <button className="button" onClick={saveUsers} disabled={loading}>
        {loading ? "Saving..." : "Save Users"}
      </button>
      {/* Basically same as homepage: chose this over Err/Success messages to keep consitent */}
      {message && (
        <p className={`message ${message.toLowerCase().includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SavePage;

