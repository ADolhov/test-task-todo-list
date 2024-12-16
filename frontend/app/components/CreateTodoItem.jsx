// frontend/app/components/CreateTodoItem.jsx
'use client';
import { useReducer } from 'react';
import { todosApi } from '../api/todos';
import ErrorMessage from './ErrorMessage';

const initialState = {
  todo: { title: '', description: '', id: null },
  error: null,
  isSubmitting: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        todo: { ...state.todo, [action.field]: action.value }
      };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, error: null };
    case 'SUBMIT_SUCCESS':
      return { ...initialState };
    case 'SUBMIT_ERROR':
      return { ...state, error: action.error, isSubmitting: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export default function CreateTodoItem({ onTodoCreated }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todo, error, isSubmitting } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });

    try {
      const response = await todosApi.createTodo(todo);
      if (response.ok) {
        dispatch({ type: 'SUBMIT_SUCCESS' });
        onTodoCreated();
      } else {
        throw new Error('Failed to create todo');
      }
    } catch (err) {
      dispatch({
        type: 'SUBMIT_ERROR',
        error: 'Failed to create todo. Please try again.'
      });
    }
  };

  return (
    <div className="mb-6">
      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => dispatch({ type: 'CLEAR_ERROR' })}
        />
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={todo.title}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_FIELD',
              field: 'title',
              value: e.target.value
            })
          }
          placeholder="Todo title"
          className="border p-2 mr-2"
          required
          disabled={isSubmitting}
        />
        <input
          type="text"
          value={todo.description}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_FIELD',
              field: 'description',
              value: e.target.value
            })
          }
          placeholder="Description"
          className="border p-2 mr-2"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
}