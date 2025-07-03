import { useUnit } from 'effector-react';
import { $requests } from '../entities/request/model';
import { useNavigate } from 'react-router-dom';
import type { Request } from '../entities/request/types';
import styles from './RequestsList.module.css';

const RequestsList = () => {
  const requests = useUnit($requests);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Список заявок</div>
      <button className={styles.btn} onClick={() => navigate('/requests/new')}>Создать заявку</button>
      {requests.length === 0 ? (
        <div className={styles.empty}>Нет данных</div>
      ) : (
        <ul className={styles.items}>
          {requests.map((req: Request) => (
            <li key={req.id} className={styles.card} onClick={() => navigate(`/requests/${req.id}`)}>
              <div className={styles.cardTitle}>{req.title}</div>
              <div className={styles.cardDate}>{new Date(req.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestsList; 