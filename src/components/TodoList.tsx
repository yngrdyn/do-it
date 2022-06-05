import Todo, { TodoData } from './Todo';

export interface TodoListData {
  todos: TodoData[];
  deleteTodo: (id: number) => void;
  completeTodo: (id: number) => void;
}

const TodoList = ({todos, deleteTodo, completeTodo}: TodoListData) => {
  return (
    <div className='todo-container'>
      <ul className='todo-list'>
        {todos.map((todo) => (
          <li className='todo' key={todo.id}>
            <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;