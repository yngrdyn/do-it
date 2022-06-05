import React, { useState } from 'react';

export interface TodoForm {
  addTodo: (todo: string) => void;
  changeStatus: (status: TodoStatus) => void;
}

export enum TodoStatus {
  all='All',
  completed='Completed',
  uncompleted='Uncompleted',
};

const Form = ({addTodo, changeStatus}: TodoForm) => {
  const [todo, setTodo] = useState<string>('');

  const todoHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTodo((e.target as HTMLInputElement).value);
  };

  const statusHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    changeStatus(TodoStatus[((e.target as HTMLSelectElement).value) as keyof typeof TodoStatus]);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(todo);
    setTodo('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input type='text' className='todo-input' value={todo} onChange={todoHandler} placeholder='New task'/>
        <button className='todo-button' type='submit' disabled={todo.length === 0}>
          <i className='fas fa-plus-square'></i>
        </button>
      </div>
      <div className='select'>
        <select name='todos' className='filter-todo' onChange={statusHandler}>
          <option value='all'>{TodoStatus.all}</option>
          <option value='completed'>{TodoStatus.completed}</option>
          <option value='uncompleted'>{TodoStatus.uncompleted}</option>
        </select>
      </div>
    </form>
  );
};

export default Form;