import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { addRequest } from '../entities/request/model';
import RequestForm from '../shared/ui/RequestForm';
import styles from './RequestCreate.module.css';

const categories = ['Техническая', 'Финансовая', 'Общая'];

const RequestCreate = () => {
  const navigate = useNavigate();
  const add = useUnit(addRequest);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Создание заявки</div>
      <RequestForm
        categories={categories}
        onSubmit={({ title, description, category }) => {
          add({ title, description, category });
          navigate('/requests');
        }}
        submitLabel="Создать заявку"
      />
    </div>
  );
};

export default RequestCreate; 