import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Task } from '../../types/task';
import { deleteTask, updateTask } from '../../services/taskService';
import css from './TasksList.module.css';

interface TasksListProps {
  tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: updateTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <ul className={css.list}>
      {tasks.map(task => (
        <li className={css.item} key={task.id}>
          <input
            className={css.checkbox}
            type="checkbox"
            defaultChecked={task.completed}
            onChange={() =>
              updateMutation({ id: task.id, completed: !task.completed })
            }
          />
          <span className={css.text}>{task.title}</span>
          <button
            className={css.button}
            onClick={() => deleteMutation(task.id)}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
