// frontend/app/api/todos.js
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const todosApi = {
  fetchTodos: async (filter, page, perPage) => {
    const response = await fetch(
      `${BASE_URL}/todos?status=${filter}&page=${page}&per_page=${perPage}`
    );
    const data = await response.json();
    return {
      todos: data.todos || [],
      total_pages: data.total_pages || 1,
      current_page: data.current_page || 1
    };
  },

  createTodo: async (todo) => {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    });
    return response;
  },

  deleteTodo: async (id) => {
    return await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
  },

  toggleComplete: async (id) => {
    return await fetch(`${BASE_URL}/todos/${id}/toggle_complete`, {
      method: "PATCH",
    });
  },
};
