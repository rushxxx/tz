import { useState } from 'react';
import styles from './RequestForm.module.css';

export interface RequestFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialCategory?: string;
  categories: string[];
  onSubmit: (data: { title: string; description: string; category: string }) => void;
  submitLabel?: string;
}

const RequestForm = ({
  initialTitle = '',
  initialDescription = '',
  initialCategory,
  categories,
  onSubmit,
  submitLabel = 'Сохранить',
}: RequestFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [category, setCategory] = useState(initialCategory || categories[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Заполните все обязательные поля');
      return;
    }
    setError('');
    onSubmit({ title, description, category });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className={styles.label}>Название заявки *</div>
        <input
          className={error && !title.trim() ? `${styles.input} ${styles.inputError}` : styles.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {error && !title.trim() && (
          <div className={styles.errorField}>Поле обязательно для заполнения</div>
        )}
      </div>
      <div>
        <div className={styles.label}>Описание *</div>
        <textarea
          className={error && !description.trim() ? `${styles.textarea} ${styles.textareaError}` : styles.textarea}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {error && !description.trim() && (
          <div className={styles.errorField}>Поле обязательно для заполнения</div>
        )}
      </div>
      <div>
        <div className={styles.label}>Категория</div>
        <select className={styles.select} value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <button type="submit" className={styles.button}>{submitLabel}</button>
    </form>
  );
};

export default RequestForm; 