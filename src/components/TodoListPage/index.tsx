import { useState, useRef, type FormEvent, type ChangeEvent } from 'react';

let id = 0;
const existingTasks = [
  {
    id: id++,
    todo: 'Walk the dog',
  },
  {
    id: id++,
    todo: 'Water the plants',
  },
  {
    id: id++,
    todo: 'Wash the dishes',
  },
];

export default function TodoListPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState(existingTasks);
  const [todo, setTodo] = useState('');

  function createTodo() {
    if (!inputRef.current) {
      return;
    }

    const tooShort = todo.length < 2;
    if (tooShort) {
      inputRef.current.focus();
      return;
    }

    const newTodo = {
      id: id++,
      todo: todo,
    };
    setTodos((prev) => [...prev, newTodo]);
    setTodo('');
    inputRef.current.focus();
  }

  function handleDeleteClick(id: number) {
    return () => {
      const newTodos = todos.filter((t) => t.id !== id);
      setTodos(newTodos);
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo();
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setTodo(e.currentTarget.value);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <form action='' onSubmit={handleSubmit}>
          <input
            aria-label='Add new task'
            className='border'
            type='text'
            ref={inputRef}
            placeholder='Add your task'
            autoFocus
            value={todo}
            onChange={handleOnChange}
          />
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span>{t.todo}</span>
            <button onClick={handleDeleteClick(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
