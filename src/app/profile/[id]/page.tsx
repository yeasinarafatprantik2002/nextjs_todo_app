/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profilepage = ({ params }: any) => {
  const router = useRouter();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
  });
  const logout = async () => {
    try {
      await axios.get("/api/users/logout/");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const userDetail = async () => {
    try {
      const id = params.id;

      const response = await axios.post("/api/users/me/");

      const user = response.data.user;

      if (!user) {
        throw new Error("User not found");
      }

      if (id !== user._id) {
        throw new Error("User not found");
      }

      setUser({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    userDetail();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-start gap-4 justify-center">
        <h1 className=" text-4xl">Profile Page</h1>
        <p className=" p-3 bg-green-500 rounded text-black">ID: {user._id}</p>
        <hr />
        <p className=" p-3 bg-green-500 rounded text-black">
          Username: {user.username}
        </p>
        <hr />
        <p className=" p-3 bg-green-500 rounded text-black">
          Email: {user.email}
        </p>
        <button className=" m-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          <Link href={`/`}>Home</Link>
        </button>
        <button
          className=" m-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profilepage;
