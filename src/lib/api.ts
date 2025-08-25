const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  color?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
  color?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  color?: string;
  completed?: boolean;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  console.log('API Request:', { url, config });

  try {
    const response = await fetch(url, config);

    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Data:', errorData);
      throw new ApiError(
        response.status,
        errorData.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();
    console.log('API Success Data:', data);
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError(0, `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const todoApi = {
  // Get all tasks
  async getTodos(): Promise<Todo[]> {
    return apiRequest<Todo[]>('/tasks');
  },

  // Get a specific task
  async getTodo(id: number): Promise<Todo> {
    return apiRequest<Todo>(`/tasks/${id}`);
  },

  // Create a new task
  async createTodo(data: CreateTodoRequest): Promise<Todo> {
    return apiRequest<Todo>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update a task
  async updateTodo(id: number, data: UpdateTodoRequest): Promise<Todo> {
    return apiRequest<Todo>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete a task
  async deleteTodo(id: number): Promise<void> {
    return apiRequest<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  // Toggle task completion status
  async toggleTodo(id: number, completed: boolean): Promise<Todo> {
    return this.updateTodo(id, { completed });
  },
};

export { ApiError };
