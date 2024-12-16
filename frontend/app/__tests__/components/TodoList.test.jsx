// frontend/app/__tests__/TodoList.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import TodoList from '../../components/TodoList';
import { todosApi } from '../../api/todos';

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
});
