// frontend/app/components/TodoItem.jsx
export default function TodoItem({ todo, onToggleComplete, onDelete }) {
    return (
      <div className="flex items-center justify-between border p-4 rounded">
        <div>
          <h3 className={`text-xl ${todo.completed ? 'line-through' : ''}`}>
            {todo.title}
          </h3>
          <p className="text-gray-600">{todo.description}</p>
        </div>
        <div className="flex gap-2">
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