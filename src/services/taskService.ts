import axios from 'axios';
import { type Task } from '../types/task';

export const getTasks = async () => {
  const res = await axios.get<Task[]>(
    'https://689b13bfe727e9657f63a73d.mockapi.io/tasks'
  );
  return res.data;
};

interface NewTask {
  title?: string;
  completed?: false;
}

export const postTask = async (newTask: NewTask) => {
  const res = axios.post<Task>(
    'https://689b13bfe727e9657f63a73d.mockapi.io/tasks',
    newTask
  );

  return res;
};

export const deleteTask = async (id: number) => {
  const res = await axios.delete<Task[]>(
    `https://689b13bfe727e9657f63a73d.mockapi.io/tasks/${id}`
  );
  return res.data;
};

interface updateTaskProps {
  id: number;
  completed: boolean;
}

export const updateTask = async ({ id, completed }: updateTaskProps) => {
  const res = await axios.put<Task>(
    `https://689b13bfe727e9657f63a73d.mockapi.io/tasks/${id}`,
    {
      completed,
    }
  );
  return res.data;
};
