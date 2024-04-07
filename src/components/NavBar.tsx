"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

function NavBar() {
  const router = useRouter();
  const [isLoginRoute, setIsLoginRoute] = useState(false);

  const path = usePathname();
  React.useEffect(() => {
    if (path === "/login" || path === "/signup" || path === "/verify") {
      setIsLoginRoute(true);
    } else {
      setIsLoginRoute(false);
    }
  }, [path]);

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
  return (
    <div
      className={`h-[50px] ${
        isLoginRoute ? "hidden" : "flex"
      } bg-gray-700 items-center justify-around`}>
      <div className=" text-3xl">
        <Link href="/">Todo</Link>
      </div>
      <div className=" flex gap-3">
        <Link href="/profile">Profile</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className=" flex items-center justify-center">
        <button
          onClick={logout}
          className=" bg-red-500 text-white px-3 py-1 rounded-md">
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
