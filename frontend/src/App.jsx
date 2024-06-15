import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = async (e, id) => {
    try {
      let t = todos.filter((i) => i._id === id);
      setTodo(t[0].title);
      let newTodos = todos.filter((item) => item._id !== id);
      setTodos(newTodos);
      await axios.delete(`${API_URL}/${id}`); 
      saveToLS();
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDelete = async (e, id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        let newTodos = todos.filter((item) => item._id !== id);
        setTodos(newTodos);
        saveToLS();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  const handleAdd = async () => {
    const newTodo = { title: todo, completed: false };
    try {
      const response = await axios.post(API_URL, newTodo);
      setTodos([...todos, response.data]);
      setTodo("");
      saveToLS();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };




  const handleCheckbox = async (e) => {
    const id = e.target.name;
    const updatedTodo = { ...todos.find(todo => todo._id === id), completed: e.target.checked };

    try {
      await axios.put(`${API_URL}/${id}`, updatedTodo);
      const updatedTodos = todos.map(todo => todo._id === id ? updatedTodo : todo);
      setTodos(updatedTodos);
     
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl bg-teal-100 p-5 min-h-[80vh]">
        <TodoInput
          todo={todo}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />

        <label className="inline-flex items-center">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="form-checkbox h-5 w-5 text-blue-500 rounded"
          />{" "}
          <span className="ml-2 text-gray-700">Show Finished</span>
        </label>
        <h1 className="text-xl font-bold">Your Todos</h1>
        <TodoList
          todos={todos}
          handleCheckbox={handleCheckbox}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          showFinished={showFinished}
        />
      </div>
    </>
  );
}

export default App;
