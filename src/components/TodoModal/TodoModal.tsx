import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { clearCurrentTodo } from '../../features/currentTodo';
import { getTodos, getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentTodo) {
      setLoading(true);

      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{currentTodo.id}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(clearCurrentTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo.title}
          </p>

          {user && (
            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
