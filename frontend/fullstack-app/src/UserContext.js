import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMessage(""); // clear prev message
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setMessage("Users successfully fetched!"); //sucess message
    } catch (err) {
      setMessage("Failed to fetch the users."); // err message
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ users, setUsers, fetchUsers, loading, message, setMessage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);