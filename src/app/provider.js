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
    // Check if user exists in the database
    const resp = await axios.post("/api/create-user", {
      user: user,
    });
    console.log(resp.data);
  };
  return <div>{children}</div>;
}

export default Provider;
