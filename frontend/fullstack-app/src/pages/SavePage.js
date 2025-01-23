import React, { useState } from "react";
import { useUserContext } from "../UserContext";
import axios from "axios";
import "./SavePage.css";

const SavePage = () => {
  const { users, message, setMessage } = useUserContext();
  const [loading, setLoading] = useState(false);

  const saveUsers = async () => {
    if (!users || users.length === 0) {
      setMessage("Failed to save, no users are available. Download users first.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4500/save", { users });
      setMessage(response.data.message);
    } catch (err) {
      console.error("Error saving users: ", err);
      setMessage("Failed to save users. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page save-page">
      <h1 className="title">Save Page</h1>
      <button className="button" onClick={saveUsers} disabled={loading}>
        {loading ? "Saving..." : "Save Users"}
      </button>
      {message && (
        <p className={`message ${message.toLowerCase().includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SavePage;

