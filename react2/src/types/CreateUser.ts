import { z } from 'zod';

// Схема валидации для создания пользователя
export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .regex(/^[a-zA-Zа-яА-Я\s]+$/, 'Имя может содержать только буквы и пробелы'),
  
  username: z
    .string()
    .min(3, 'Username должен содержать минимум 3 символа')
    .max(20, 'Username не должен превышать 20 символов')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username может содержать только буквы, цифры и подчеркивания'),
  
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Введите корректный email адрес'),
  
  phone: z
    .string()
    .min(1, 'Телефон обязателен')
    .regex(
      /^[\+]?[1-9][\d]{0,15}$/,
      'Введите корректный номер телефона (может начинаться с +)'
    ),
  
  website: z
    .string()
    .min(1, 'Сайт обязателен')
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
      'Введите корректный URL сайта (например: example.com)'
    ),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

// Интерфейс для ответа API
export interface CreateUserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
