// frontend/app/components/TodoList.jsx
'use client';
import { useState, useEffect } from 'react';
import { todosApi } from '../api/todos';
import Filter from './Filter';
import TodoItem from './TodoItem';
import Pagination from './Pagination';
import ErrorMessage from './ErrorMessage';
import CreateTodoItem from './CreateTodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(5);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await todosApi.fetchTodos(filter, currentPage, perPage);
      if (response.todos) {
        setTodos(response.todos);
        setTotalPages(response.total_pages);
      } else {
        setTodos([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError('Failed to fetch todos. Please try again later.');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filter, currentPage, perPage]); // Add perPage to dependencies

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteTodo = async (id) => {
    setError(null);
    try {
      await todosApi.deleteTodo(id);
      fetchTodos();
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
    }
  };

  const handleToggleComplete = async (id) => {
    setError(null);
    try {
      await todosApi.toggleComplete(id);
      fetchTodos();
    } catch (err) {
      setError('Failed to update todo. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Todo List</h1>

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        )}

        <Filter currentFilter={filter} onFilterChange={setFilter} />

        <CreateTodoItem onTodoCreated={fetchTodos} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          perPage={perPage}
          onPerPageChange={setPerPage}
        />
      </div>
    </div>
  );
}