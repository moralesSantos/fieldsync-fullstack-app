import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../UserContext";
import "./FetchPage.css";

const FetchPage = () => {
  const { users, setUsers, message, setMessage } = useUserContext();
  const [loading, setLoading] = useState(false);

  // Reset users and message when the page loads
  useEffect(() => {
    setUsers([]); 
    setMessage(""); 
  }, [setUsers, setMessage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await axios.get("http://localhost:4500/fetch");
      setUsers(response.data);
      setMessage("Users successfully fetched!");
    } catch (err) {
      console.error("Error fetching users: ", err);
      setMessage("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page fetch-page">
      <h1 className="title">Fetch Page</h1>
      <button className="button" onClick={fetchUsers} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Users"}
      </button>
      {message && (
        <p className={`message ${message.toLowerCase().includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      )}
      {users.length === 0 && !loading ? (
        <p>No data available to fetch!</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.company?.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FetchPage;
