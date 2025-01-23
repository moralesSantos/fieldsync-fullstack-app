import React, { createContext, useState, useContext } from "react";

/**
 * Used usercontext and custom hooks to centrazile data & avoid prop drilling. 
 * With usercontext it allows all components that need access to same state (users/messages/etc) 
 * to simply consume context. (Avoiding duplication and improving maintainability)
 * Basically just used instead of passing props since passing them between to many
 * components can get complicated. 
 */

const UserContext = createContext();

// Sets a global state and functions for managing user data and for app messages(err/sucess)
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]); //Holds the users 
  const [loading, setLoading] = useState(false); //Tracks loading state for async operations 
  const [message, setMessage] = useState(""); //Holds the messages for error/success

  //Fetches the users from the external api (one provided by fieldsync)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMessage(""); // clear prev messages
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data); //updates users state with fetched data
      setMessage("Users successfully fetched!"); //diplay sucess message
    } catch (err) {
      setMessage("Failed to fetch the users."); //display err message
    } finally {
      setLoading(false); //resets loading state 
    }
  };


  return (
    <UserContext.Provider value={{ users, setUsers, fetchUsers, loading, message, setMessage }}>
      {children}
    </UserContext.Provider>
  );
};

//Custom hook to be able to use UserContext 
export const useUserContext = () => useContext(UserContext);