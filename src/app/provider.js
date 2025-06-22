"use client";
import React from "react";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function Provider({ children }) {
  const { user } = useUser();
  useEffect(() => {
    user && checkIsNewUser();
  }, [user]);

  const checkIsNewUser = async () => {
    try {
      console.log("Provider: Checking if user is new:", user?.primaryEmailAddress?.emailAddress);
      
      // Check if user exists in the database
      const resp = await axios.post("/api/create-user", {
        user: user,
      });
      
      console.log("Provider: Create user response:", resp.data);
    } catch (error) {
      console.error("Provider: Error in checkIsNewUser:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
