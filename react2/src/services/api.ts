import axios from 'axios';
import type { ApiResponse } from '../types/ApiTypes';
import type { Post } from '../types/Post';
import type { CreateUserFormData, CreateUserResponse } from '../types/CreateUser';

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: 'https://studapi.teachmeskills.by/blog',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерсепторы для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Сервер ответил с ошибкой
      throw new Error(`HTTP Error: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      // Запрос был сделан, но ответа не получено
      throw new Error('Network Error: No response received');
    } else {
      // Что-то другое пошло не так
      throw new Error(`Error: ${error.message}`);
    }
  }
);

// API методы
export const postsAPI = {
  // Получить все посты
  getAllPosts: async (): Promise<ApiResponse<Post>> => {
    const response = await api.get<ApiResponse<Post>>('/posts/?limit=100');
    return response.data;
  },

  // Получить пост по ID
  getPostById: async (id: string): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}/`);
    return response.data;
  },

  // Поиск постов
  searchPosts: async (query: string): Promise<ApiResponse<Post>> => {
    const response = await api.get<ApiResponse<Post>>('/posts/?limit=100', {
      params: { search: query }
    });
    return response.data;
  },
};

// API методы для пользователей
export const usersAPI = {
  // Создать нового пользователя
  createUser: async (userData: CreateUserFormData): Promise<CreateUserResponse> => {
    const response = await axios.post<CreateUserResponse>(
      'https://jsonplaceholder.typicode.com/users',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },
};

export default api;
