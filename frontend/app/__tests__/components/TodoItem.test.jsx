import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../../components/TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false
  };

  const mockHandlers = {
    onToggleComplete: jest.fn(),
    onDelete: jest.fn(),
    onUpdate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    expect(screen.getByText('TODO-1: Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('handles completion toggle', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    fireEvent.click(screen.getByText('Complete'));
    expect(mockHandlers.onToggleComplete).toHaveBeenCalledWith(1);
  });

  it('handles deletion', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
  });

  it('enters edit mode on click', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    fireEvent.click(screen.getByText('TODO-1: Test Todo'));
    expect(screen.getByText('Edit TODO-1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  it('handles todo update', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    // Enter edit mode
    fireEvent.click(screen.getByText('TODO-1: Test Todo'));

    // Update title
    const titleInput = screen.getByDisplayValue('Test Todo');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated Todo');

    // Save changes
    fireEvent.click(screen.getByText('Save'));

    expect(mockHandlers.onUpdate).toHaveBeenCalledWith(1, {
      ...mockTodo,
      title: 'Updated Todo'
    });
  });

  it('cancels editing', async () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    // Enter edit mode
    fireEvent.click(screen.getByText('TODO-1: Test Todo'));

    // Update title but cancel
    const titleInput = screen.getByDisplayValue('Test Todo');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated Todo');

    fireEvent.click(screen.getByText('Cancel'));

    // Verify original content is shown
    expect(screen.getByText('TODO-1: Test Todo')).toBeInTheDocument();
    expect(mockHandlers.onUpdate).not.toHaveBeenCalled();
  });
});