// frontend/app/components/TodoList.jsx
'use client';
import { useState, useEffect } from 'react';
import { todosApi } from '../api/todos';
import Filter from './Filter';
import TodoItem from './TodoItem';
import Pagination from './Pagination';
import FlashMessage from './FlashMessage';
import CreateTodoItem from './CreateTodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(5);
  const [flash, setFlash] = useState(null);

  const showFlash = (message, type = 'success') => {
    setFlash({ message, type });
    // Auto-dismiss after 3 seconds
    setTimeout(() => setFlash(null), 6000);
  };

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

  const handleCreateTodo = async () => {
    setCurrentPage(1);
    fetchTodos()
    showFlash(`New TODO created successfully!`);
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await todosApi.deleteTodo(id);
      if (response.ok) {
        fetchTodos()
        showFlash(`TODO-${id} deleted successfully!`);
      }
    } catch (error) {
      showFlash('Failed to delete todo', 'error');
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

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const response = await todosApi.updateTodo(id, updatedTodo);
      if (response.ok) {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        ));
        showFlash(`TODO-${id} created successfully!`);
      }
    } catch (error) {
        showFlash('Failed to update todo', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
        {flash && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onDismiss={() => setFlash(null)}
        />
      )}
      <div className="mb-6">
        <CreateTodoItem onTodoCreated={handleCreateTodo} />

        <h1 className="text-3xl font-bold mb-4">Todo List</h1>

        <Filter currentFilter={filter} onFilterChange={setFilter} />


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
                onUpdate={handleUpdateTodo}
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