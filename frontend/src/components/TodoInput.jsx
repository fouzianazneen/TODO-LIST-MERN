import React from "react";

const TodoInput = ({ todo, handleChange, handleAdd }) => {
  return (
    <div className="addTodo my-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Add a Todo</h1>
      <div className="flex items-center">
        <input
          onChange={handleChange}
          value={todo}
          type="text"
          className="w-1/2  py-2 px-4 border border-gray-900 rounded-md focus:outline-none focus:ring focus:border-teal-900"
          placeholder="Enter Your Todo"
        /> 

        <button
         onClick={() => handleAdd(todo)}
        
          disabled={todo.length <= 3}
          className={`ml-4 bg-teal-700 hover:bg-teal-800 text-black  py-2 px-6 text-sm font-bold rounded-md focus:outline-none ${
            todo.length <= 3 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Save
        </button>

      </div>
    </div>
  );
};

export default TodoInput;













