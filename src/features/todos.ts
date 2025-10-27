import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getTodos(state) {
      return state;
    },

    addTodo(state, action: PayloadAction<Todo>) {
      state.items.push(action.payload);
    },

    removeTodo(state, action: PayloadAction<number>) {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },

    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.items.find(todo => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const {
  setTodos,
  startLoading,
  setError,
  getTodos,
  addTodo,
  removeTodo,
  toggleTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
