"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  async function verifyUserEmail() {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerify(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token || "");
  }, []);

  useEffect(() => {
    if (token !== "") {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl text-white">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black m-2 rounded">
        {token ? `${token}` : "no token"}
      </h2>
      {verify && (
                <div>
                    <h2 className="text-xl bg-green-400 rounded m-2 p-2">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-xl bg-red-500 text-black rounded m-2 p-2">Error</h2>
                    
                </div>
            )}
    </div>
  );
};

export default VerifyEmail;