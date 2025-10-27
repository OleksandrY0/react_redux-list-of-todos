import { useAppSelector } from './app/hooks';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { loading } = useAppSelector(state => state.todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
