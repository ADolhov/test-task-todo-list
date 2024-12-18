// frontend/app/components/TodoItem.jsx
import { useState } from 'react';

export default function TodoItem({ todo, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleSave = async () => {

    if (!editedTodo.title.trim()) {
      return; // Don't save if title is empty
    }
    await onUpdate(todo.id, editedTodo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTodo({ ...todo });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border p-4 rounded duration-300 transition shadow-md">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl mb-2">Edit TODO-{todo.id}</h2>
          <input
            type="text"
            value={editedTodo.title}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, title: e.target.value })
            }
            className="border p-2"
            placeholder="Todo title"
            required
          />
          <input
            type="text"
            value={editedTodo.description}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, description: e.target.value })
            }
            className="border p-2"
            placeholder="Description"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={JSON.stringify(editedTodo) === JSON.stringify(todo)}
              className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between border p-4 rounded cursor-pointer shadow-md duration-300 transition"
      onClick={() => setIsEditing(true)}
    >
      <div>
        <h3 className={`text-xl ${todo.completed ? 'line-through' : ''}`}>
          TODO-{todo.id}: {todo.title}
        </h3>
        <p className="text-gray-600">{todo.description}</p>
      </div>
      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`px-3 py-1 rounded ${
            todo.completed ? 'bg-yellow-500' : 'bg-green-500'
          } text-white`}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}