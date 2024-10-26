import { FC, useState } from 'react';
import TodoForm from '../Form/TodoForm';
import TodoList from '../List/TodoList';
import Styles from './todo.module.css';
import { v4 as uuidv4 } from 'uuid';
import MacOsCard from '../Card/MacOsCard';
import TaskStatus from '../Tally/TaskStatus';

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

const Todo: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const addTodo = (task: string) => {
    if (!editTodo) {
      const newTodo: Todo = {
        id: uuidv4(),
        task,
        completed: false,
        isEditing: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, task, isEditing: false } : todo
        )
      );
      setEditTodo(null); // Reset after editing
    }
  };

  const handleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    if (!editTodo) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } else {
      console.log('Cant Delete while editing');
    }
  };

  const handleEdit = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, isEditing: true }
          : { ...todo, isEditing: false }
      )
    );
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditTodo(todoToEdit);
    }
  };

  return (
    <div className={Styles['todo-wrapper']}>
      <h2>Get Things Done!</h2>
      <TodoForm addTodo={addTodo} editTodo={editTodo} />
      <div className={Styles['list-wrapper']}>
        {todos.map((todo) => (
          <TodoList
            key={todo.id}
            task={todo}
            handleComplete={handleComplete}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <MacOsCard>
        <TaskStatus />
      </MacOsCard>
    </div>
  );
};

export default Todo;
export type { Todo };