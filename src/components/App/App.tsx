import { useQuery } from '@tanstack/react-query';
import 'modern-normalize';
import TasksList from '../TasksList/TasksList';
import { getTasks } from '../../services/taskService';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import css from './App.module.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  return (
    <div className={css.container}>
      <header className={css.header}>
        <button className={css.createButton} onClick={openModal}>
          Create task
        </button>
      </header>
      {isLoading && <p>Loading tasks...</p>}
      {isError && <p>Error...</p>}
      {data && (data.length > 0 ? <TasksList tasks={data} /> : <p>No Tasks</p>)}
      {/* {data && <TasksList tasks={data} />} */}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <TaskForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
