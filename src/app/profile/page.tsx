/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

  const userDetail = async () => {
    try {
      const response = await axios.post("/api/users/me/");
      console.log(response.data.user._id);
      router.push(`/profile/${response.data.user._id}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    userDetail();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2"></div>
  );
};

export default ProfilePage;
