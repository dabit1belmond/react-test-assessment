import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoList: [],
};

const appSlice = createSlice({
  initialState,
  name: 'appSlice',
  reducers: {
    reset: () => initialState,
    addTodo: (state, action) => {},
  },
});

export const { reset, addTodo } = appSlice.actions;
export default appSlice.reducer;
