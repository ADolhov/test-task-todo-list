// frontend/app/__tests__/TodoList.test.jsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TodoList from '../../components/TodoList';
import { todosApi } from '../../api/todos';
import userEvent from '@testing-library/user-event';

jest.mock('../../api/todos');

describe('TodoList', () => {
  const mockTodos = [
    { id: 1, title: 'Test Todo 1', description: 'Description 1', completed: false },
    { id: 2, title: 'Test Todo 2', description: 'Description 2', completed: true }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    todosApi.fetchTodos.mockResolvedValue({
      todos: mockTodos,
      total_pages: 1,
      current_page: 1
    });
  });

  it('renders todo list successfully', async () => {
    render(<TodoList />);

    await waitFor(() => {
      expect(todosApi.fetchTodos).toHaveBeenCalled();
    });

    expect(screen.getByText('TODO-1: Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('TODO-2: Test Todo 2')).toBeInTheDocument();
  });

  it('displays loading state while fetching todos', async () => {
    render(<TodoList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('handles per page change', async () => {
    render(<TodoList />);
    await todosApi.fetchTodos.mockResolvedValue({
      todos: mockTodos,
      total_pages: 1,
      current_page: 1
    });

    const perPageSelect = screen.getByRole('combobox', { className: 'pagination-select' });
    fireEvent.change(perPageSelect, { target: { value: '10' } });

    expect(todosApi.fetchTodos).toHaveBeenCalledWith('all', 1, 10);
  });

  it('resets to page 1 when filter changes', async () => {
    render(<TodoList />);

    // First go to page 2
    await waitFor(() => {
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);
    });

    // Then change filter
    const filterButton = screen.getByText('Completed');
    await userEvent.click(filterButton);

    expect(todosApi.fetchTodos).toHaveBeenCalledWith('completed', 1, 5);
  });

  it('updates todo list after successful creation', async () => {
    const mockNewTodo = { id: 3, title: 'New Todo', completed: false };
    // Mock both API calls
    todosApi.createTodo.mockResolvedValueOnce({ ok: true });
    todosApi.fetchTodos
      .mockResolvedValueOnce({ todos: mockTodos, total_pages: 1 })
      .mockResolvedValueOnce({
        todos: [...mockTodos, mockNewTodo],
        total_pages: 1
      });

    render(<TodoList />);

    // Fill in the todo form
    fireEvent.change(screen.getByPlaceholderText('Todo title'), {
      target: { value: 'New Todo' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('Add Todo'));

    // Wait for success message
    await screen.findByText('New TODO created successfully!');

    expect(todosApi.createTodo).toHaveBeenCalledTimes(1);
    expect(todosApi.fetchTodos).toHaveBeenCalledTimes(2);
  });

  it('dismisses flash message when clicked', async () => {
    // Mock both API calls
    todosApi.deleteTodo.mockResolvedValue({ ok: true });
    todosApi.fetchTodos
      .mockResolvedValueOnce({ todos: mockTodos, total_pages: 1 })
      .mockResolvedValueOnce({
        todos: mockTodos.slice(1), // Return todos without the deleted item
        total_pages: 1
      });

    render(<TodoList />);

    // Wait for initial todos to load
    await waitFor(() => {
      expect(screen.getByText('TODO-1: Test Todo 1')).toBeInTheDocument();
    });

    // Click delete button and wait for flash message
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    // Wait for flash message to appear
    const flashMessage = await screen.findByText('TODO-1 deleted successfully!');
    expect(flashMessage).toBeInTheDocument();

    // Click dismiss button
    const dismissButton = screen.getByRole('button', { name: 'Dismiss' });
    fireEvent.click(dismissButton);

    // Verify flash message is gone
    expect(flashMessage).not.toBeInTheDocument();
  });
});
