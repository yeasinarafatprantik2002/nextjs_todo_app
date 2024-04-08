/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profilepage = ({ params }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState({
    id: "",
    title: "",
    description: "",
  });

  const todoDetail = async () => {
    try {
      const id = params.id;

      const response = await axios.post("/api/todo/getTodo", { id });

      const todo = response.data.todo;

      if (!todo) {
        throw new Error("Todo not found");
      }

      if (id !== todo._id) {
        throw new Error("Todo not found");
      }

      setTodo({
        id: todo._id,
        title: todo.title,
        description: todo.description,
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put("/api/todo/updateTodo", todo);
      toast.success("Todo updated successfully");
      router.push("/");
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    todoDetail();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start py-2 mt-10">
      <div className=" mt-10 flex flex-col">
        <h1 className=" text-4xl">
          {loading ? "Updating Todo" : "Update Todo"}
        </h1>
        <label htmlFor="title" className="text-xl mt-4 ">
          Title:
        </label>
        <input
          className=" mt-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black text-xl"
          id="title"
          value={todo.title}
          onChange={(e: any) => setTodo({ ...todo, title: e.target.value })}
          type="text"
          placeholder="title"
        />
        <label htmlFor="title" className="text-xl mt-4 ">
          Description:
        </label>
        <textarea
          className=" mt-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black text-xl"
          id="description"
          value={todo.description}
          onChange={(e: any) =>
            setTodo({ ...todo, description: e.target.value })
          }
          placeholder="description"
        />
      </div>
      <div>
        <button
          className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={handleSubmit}>
          Update Todo
        </button>
        <button
          className="mx-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={() => router.push("/")}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Profilepage;
