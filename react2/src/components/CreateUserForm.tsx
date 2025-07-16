import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../store/store';
import { 
  createUser, 
  selectCreateUserLoading, 
  selectCreateUserError, 
  selectCreateUserSuccess,
  clearCreateState 
} from '../store/userProfileSlice';
import { createUserSchema, type CreateUserFormData } from '../types/CreateUser';
import './CreateUserForm.css';

const CreateUserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectCreateUserLoading);
  const error = useAppSelector(selectCreateUserError);
  const success = useAppSelector(selectCreateUserSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  // Очистка состояния при размонтировании
  useEffect(() => {
    return () => {
      dispatch(clearCreateState());
    };
  }, [dispatch]);

  // Сброс формы при успешном создании
  useEffect(() => {
    if (success) {
      reset();
      // Автоматически скрываем сообщение об успехе через 3 секунды
      const timer = setTimeout(() => {
        dispatch(clearCreateState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, reset, dispatch]);

  const onSubmit = (data: CreateUserFormData) => {
    dispatch(createUser(data));
  };

  return (
    <div className="create-user-form">
      <h2 className="create-user-form__title">Создать нового пользователя</h2>
      
      {success && (
        <div className="create-user-form__success">
          ✅ Пользователь успешно создан!
        </div>
      )}

      {error && (
        <div className="create-user-form__error">
          ❌ Ошибка: {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="create-user-form__form">
        <div className="create-user-form__field">
          <label htmlFor="name" className="create-user-form__label">
            Имя *
          </label>
          <input
            id="name"
            type="text"
            placeholder="Введите полное имя"
            className={`create-user-form__input ${errors.name ? 'create-user-form__input--error' : ''}`}
            {...register('name')}
          />
          {errors.name && (
            <span className="create-user-form__field-error">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="create-user-form__field">
          <label htmlFor="username" className="create-user-form__label">
            Username *
          </label>
          <input
            id="username"
            type="text"
            placeholder="Введите username"
            className={`create-user-form__input ${errors.username ? 'create-user-form__input--error' : ''}`}
            {...register('username')}
          />
          {errors.username && (
            <span className="create-user-form__field-error">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="create-user-form__field">
          <label htmlFor="email" className="create-user-form__label">
            Email *
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            className={`create-user-form__input ${errors.email ? 'create-user-form__input--error' : ''}`}
            {...register('email')}
          />
          {errors.email && (
            <span className="create-user-form__field-error">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="create-user-form__field">
          <label htmlFor="phone" className="create-user-form__label">
            Телефон *
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+7-XXX-XXX-XXXX"
            className={`create-user-form__input ${errors.phone ? 'create-user-form__input--error' : ''}`}
            {...register('phone')}
          />
          {errors.phone && (
            <span className="create-user-form__field-error">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div className="create-user-form__field">
          <label htmlFor="website" className="create-user-form__label">
            Сайт *
          </label>
          <input
            id="website"
            type="text"
            placeholder="example.com"
            className={`create-user-form__input ${errors.website ? 'create-user-form__input--error' : ''}`}
            {...register('website')}
          />
          {errors.website && (
            <span className="create-user-form__field-error">
              {errors.website.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="create-user-form__submit"
        >
          {isLoading ? 'Создание...' : 'Создать пользователя'}
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
