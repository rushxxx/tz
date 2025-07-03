import { useParams, useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $requests, removeRequest, updateRequest } from '../entities/request/model';
import type { Request } from '../entities/request/types';
import { useState } from 'react';
import styles from './RequestDetail.module.css';
import RequestForm from '../shared/ui/RequestForm';

const categories = ['Техническая', 'Финансовая', 'Общая'];

const RequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { requests, remove, update } = useUnit({ requests: $requests, remove: removeRequest, update: updateRequest });
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  const request = requests.find((r: Request) => r.id === id);

  if (!request) {
    return <div className={styles.container}>Заявка не найдена</div>;
  }

  const handleDelete = () => {
    remove(request.id);
    navigate('/requests');
  };

  const handleEdit = (data: { title: string; description: string; category: string }) => {
    update({ ...request, ...data });
    setShowEdit(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{request.title}</div>
      <div className={styles.row}><span className={styles.label}>Описание:</span>{request.description}</div>
      <div className={styles.row}><span className={styles.label}>Категория:</span>{request.category}</div>
      <div className={styles.date}>{new Date(request.createdAt).toLocaleString()}</div>
      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.delete}`} onClick={handleDelete}>Удалить заявку</button>
        <button className={`${styles.btn} ${styles.edit}`} onClick={() => setShowEdit(true)}>Редактировать заявку</button>
      </div>
      {showEdit && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={() => setShowEdit(false)} title="Закрыть">×</button>
            <div className={styles.modalTitle}>Редактирование заявки</div>
            <RequestForm
              initialTitle={request.title}
              initialDescription={request.description}
              initialCategory={request.category}
              categories={categories}
              onSubmit={handleEdit}
              submitLabel="Сохранить"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetail; 