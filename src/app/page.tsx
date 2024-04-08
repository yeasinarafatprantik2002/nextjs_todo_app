"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    isCompleted: Boolean,
  });
  const [todos, setTodos] = useState([]);

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      await axios.post("/api/todo/createTodo", todo);
      toast.success("Todo creation successful");
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete("/api/todo/deleteTodo/", {
        data: { id: id },
      });
      toast.success("Todo deletion successful");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleUpdate = async (id: any) => {
    try {
      router.push(`/updateTodo/${id}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // const handleComplete = async (
  //   id: any,
  //   title: String,
  //   description: String,
  // ) => {
  //   try {
  //     // console.log(todo);
  //     await axios.put("/api/todo/updateTodo", {
  //       id: id,
  //       title: title,
  //       description: description,
  //       isCompleted: true,
  //     });

  //     toast.success("Todo completed successfully");
  //   } catch (error: any) {
  //     console.error(error);
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todo/getAllTodo");
        // console.log(response.data.todos);
        setTodos(response.data.todos);
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      }
    };
    fetchTodos();
  }, [todos]);

  return (
    <main>
      <div className="flex flex-col items-center justify-start py-2 mt-10">
        <div className=" text-4xl font-bold">/-/ Welocome To My Todo App \-\</div>
        <div className=" mt-10 flex flex-col">
          <h1 className=" text-4xl">{loading ? "Adding Todo" : "Add Todo"}</h1>
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
            Add Todo
          </button>
        </div>
      </div>
      <div>
        <div>
          <div>
            {todos.map((t: any) => (
              <div
                key={t._id}
                className="flex flex-col items-center justify-center">
                <div className=" flex flex-wrap items-center border border-white">
                  <p className=" p-3 rounded">Title: {t.title}</p>
                  <p className=" p-3 rounded ">Description: {t.description}</p>

                  <div>
                    <button
                      className=" p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600"
                      onClick={() => handleUpdate(t._id)}>
                      Edit
                    </button>
                    {/* <button
                      className=" p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600"
                      onClick={() => {
                        handleComplete(t._id, t.title, t.description);
                      }}>
                      Complete
                    </button> */}
                    <button
                      className=" p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600"
                      onClick={() => {
                        handleDelete(t._id);
                      }}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
