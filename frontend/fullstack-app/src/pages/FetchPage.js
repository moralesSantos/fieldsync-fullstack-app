import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../UserContext";
import "./FetchPage.css";

const FetchPage = () => {
  const { users, setUsers, message, setMessage } = useUserContext();
  const [loading, setLoading] = useState(false);

  // Reset users and message when the page loads(same as homepage)
  useEffect(() => {
    setUsers([]); 
    setMessage(""); 
  }, [setUsers, setMessage]);

  // fetch function to access the backend and use in frontend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMessage(""); //clears previous messages
      const response = await axios.get("http://localhost:4500/fetch");
      setUsers(response.data); //updates state with fetched data
      setMessage("Users successfully fetched!"); //diplay sucess msg
    } catch (err) {
      console.error("Error fetching users: ", err); 
      setMessage("Failed to fetch users. Please try again."); //display err msg
    } finally {
      setLoading(false); //reset loading spinner
    }
  };

  return (
    <div className="page fetch-page">
      <h1 className="title">Fetch Page</h1>
      {/* Calls fetchesUsers function */}
      <button className="button" onClick={fetchUsers} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Users"}
      </button>
      {/* Display success or error msg: if contains "failed" returns in red: sucess on green*/}
      {message && (
        <p className={`message ${message.toLowerCase().includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      )}
      {/* if there are no users will return err message */}
      {users.length === 0 && !loading ? (
        <p>No data available to fetch!</p>
      ) : (
        // if users are available from db will populate after button is clicked
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
              {/* Again just mapping the data(users) */}
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
