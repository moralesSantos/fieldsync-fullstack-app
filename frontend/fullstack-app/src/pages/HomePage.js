import React, {useEffect}from "react";
import { useUserContext } from "../UserContext";
import "./HomePage.css"

const HomePage = () => {
  const { users,setUsers, fetchUsers, loading, message, setMessage } = useUserContext();

  // reset user and message when rendering pages between links
  useEffect(() => {
    setUsers([]); //Resets user data 
    setMessage(""); //clears any prior messages
  }, [setUsers, setMessage]);

  return (
    <div className="page home-page">
      <h1 className="title">Home Page</h1>
      {/* Button that get the users (fetchusers) from the api */}
      <button className="button" onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Download Users"}
      </button>
      {/* Display success or error msg: if contains "failed" returns in red: sucess on green */}
      {message && (
        <p className={`message ${message.toLowerCase().includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      )}
      {/* Renders table after fetching users: if users are available */}
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
            {/* mapping users to the table */}
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.company.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;

