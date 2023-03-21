import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './todo-list';
import store from '../redux/store';
import { Provider } from 'react-redux';
import * as actions from '../redux/slice';

describe('TodoList', () => {
  let props;
  const renderComponent = (changedProps = {}) => {
    props = { ...props, ...changedProps };
    return render(
      <Provider store={store}>
        <TodoList {...props} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    props = {};
  });
  it('should list the todos', () => {
    store.dispatch(actions.addTodo('Wash the car'));
    store.dispatch(actions.addTodo('Walk the dog'));
    store.dispatch(actions.addTodo('Clean the kitchen'));
    const { getByText } = renderComponent();
    expect(getByText('Wash the car')).toBeInTheDocument();
    expect(getByText('Walk the dog')).toBeInTheDocument();
    expect(getByText('Clean the kitchen')).toBeInTheDocument();
  });
  it('should dispatch "addTodo" action clicking on the Add Todo Button with the todo written in the input', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const { getByRole } = renderComponent();
    fireEvent.change(getByRole('textbox'), {
      target: { value: 'Pay the rent' },
    });
    fireEvent.click(getByRole('button'));
    expect(spy).toHaveBeenCalledWith(actions.addTodo('Pay the rent'));
  });
  it('should not let you add empty todos, and show a message letting you know', () => {
    const spy = jest.spyOn(actions, 'addTodo');
    const { getByRole, getByText } = renderComponent();
    fireEvent.click(getByRole('button'));
    expect(spy).not.toHaveBeenCalled();
    expect(getByText("Todo's can't be empty"));
  });
  it('should not let you add existing todos', () => {
    const spy = jest.spyOn(actions, 'addTodo');
    const { getByRole, getByText } = renderComponent({
      todoList: ['Wash the car', 'Walk the dog', 'Clean the kitchen'],
    });
    fireEvent.change(getByRole('textbox'), {
      target: { value: 'Clean the kitchen' },
    });
    fireEvent.click(getByRole('button'));
    expect(spy).not.toHaveBeenCalled();
    expect(getByText('This Todo already exists'));
  });
});
