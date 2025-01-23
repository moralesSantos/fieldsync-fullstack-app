import React, {useEffect}from "react";
import { useUserContext } from "../UserContext";
import "./HomePage.css"

const HomePage = () => {
  const { users,setUsers, fetchUsers, loading, message, setMessage } = useUserContext();

  // reset user and message when rendering pages between links
  useEffect(() => {
    setUsers([]); 
    setMessage("");
  }, [setUsers, setMessage]);

  return (
    <div className="page home-page">
      <h1 className="title">Home Page</h1>
      <button className="button" onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Download Users"}
      </button>
      {message && (
        <p className={`message ${message.toLowerCase().includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      )}
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

