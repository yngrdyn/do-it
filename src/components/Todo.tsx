export interface TodoData {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoProps {
  todo: TodoData;
  deleteTodo: (id: number) => void;
  completeTodo: (id: number) => void;
}

const Todo = ({todo, deleteTodo, completeTodo}: TodoProps) => {
  return (
    <>
      <span className={`todo-item ${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
      <button className='complete-btn' onClick={() => completeTodo(todo.id)}>
        <i className='fas fa-check'></i>
      </button>
      <button className='trash-btn' onClick={() => deleteTodo(todo.id)}>
        <i className='fas fa-trash'></i>
      </button>
    </>
  );
};

export default Todo;