import { useEffect, useState } from 'react';
import './App.css';
import Form, { TodoStatus } from './components/Form';
import { TodoData } from './components/Todo';
import TodoList from './components/TodoList';

const todoKey = 'do-it__todos';

const markAsComplete = (todos: TodoData[], id: number) =>
  todos.map((todo) => {
    if(todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed,
      }
    }

    return todo;
  });

const filterTodos = (todos: TodoData[], status: TodoStatus) => {
  switch(status) {
    case TodoStatus.completed:
      return todos.filter((todo) => todo.completed);
    case TodoStatus.uncompleted:
      return todos.filter((todo) => !todo.completed)
    default:
      return todos;
  }
};

const getLocalTodos = (): TodoData[] => {
  const localTodos = localStorage.getItem(todoKey) ?? '[]';

  return JSON.parse(localTodos);
}

const saveLocalTodos = (todos: TodoData[]) => {
  localStorage.setItem(todoKey, JSON.stringify(todos));
};

function App() {
  const [todos, setTodos] = useState<TodoData[]>(getLocalTodos());
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.all);
  const [filteredTodos, setFilteredTodos] = useState<TodoData[]>([]);

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, status));
    saveLocalTodos(todos);
  }, [todos, status]);

  const addTodo = (todo: string) => {
    setTodos((currTodos) => [...currTodos, {text: todo, completed: false, id: Date.now()}]);
  };

  const completeTodo = (id: number) => {
    setTodos((currTodos) => markAsComplete(currTodos, id));
  };

  const deleteTodo = (id: number) => {
    setTodos((currTodos) => currTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <header>
        <h1>Do it!</h1>
      </header>
      <Form addTodo={addTodo} changeStatus={setStatus}></Form>
      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} completeTodo={completeTodo}></TodoList>
    </div>
  );
}

export default App;
