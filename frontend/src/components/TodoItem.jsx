


import React from 'react';

const TodoItem = ({ item, handleCheckbox, handleEdit, handleDelete, showFinished }) => {
  if (!showFinished && item.isCompleted) {
    return null;
  }

  return (
    <div key={item._id} className="todo flex my-3 justify-between items-center p-4 border-b border-gray-200">
      <div className="flex gap-5 items-center">
        <input
          name={item._id}
          onChange={handleCheckbox}
          type="checkbox"
          checked={item.completed} 
          className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
        />
      </div>
      
     


<div className={`flex items-center ${item.completed ? 'font-bold' : ''} text-gray-900`}>
        {item.title}
      </div>




      <div className="button flex gap-2">
        <button
          onClick={(e) => handleEdit(e, item._id)}
          className="bg-teal-800 hover:bg-teal-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
        >
          Edit
        </button>
        <button
          onClick={(e) => handleDelete(e, item._id)}
          className="bg-teal-800 hover:bg-teal-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
