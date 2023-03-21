import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoList: [],
};

const appSlice = createSlice({
  initialState: initialState,
  name: 'appSlice',
  reducers: {
    addTodo: (state, action) => {},
  },
});

export const { addTodo } = appSlice.actions;
export default appSlice.reducer;
