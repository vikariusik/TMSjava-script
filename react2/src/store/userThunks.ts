import { createAsyncThunk } from '@reduxjs/toolkit'
import type { User } from '../components/interfaces';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
    }
    catch (err: unknown) {
        return 'Something went wrong';
    }
  }
)