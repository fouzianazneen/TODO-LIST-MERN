
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleCheckbox, handleEdit, handleDelete, showFinished }) => {


  const filteredTodos = !showFinished ? todos : todos.filter(item => item.completed);



  return (
    <div className="todos">
      
{filteredTodos.length === 0 && <div className="text-center font-bold text-2xl">NO TODOS DISPLAY</div>}
{filteredTodos.map((item) => (
        <TodoItem
          key={item._id}
          item={item}
          handleCheckbox={handleCheckbox}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          showFinished={showFinished}
        />
      ))}
    </div>
  );
};

export default TodoList;
