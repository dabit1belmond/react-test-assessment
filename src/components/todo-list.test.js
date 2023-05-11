import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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

  const typeAndAddNewTodo = (todo) => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: todo },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Todo' }));
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    store.dispatch(actions.reset());
    props = {};
  });
  it('lists the todos', () => {
    renderComponent();
    typeAndAddNewTodo('Wash the car');
    typeAndAddNewTodo('Walk the dog');
    typeAndAddNewTodo('Clean the kitchen');
    expect(screen.getByText('Wash the car')).toBeInTheDocument();
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
    expect(screen.getByText('Clean the kitchen')).toBeInTheDocument();
  });
  it('dispatches "addTodo" action when clicking on the Add Todo Button with the todo written in the input', () => {
    const spy = jest.spyOn(store, 'dispatch');
    renderComponent();
    typeAndAddNewTodo('Pay the rent');
    expect(spy).toHaveBeenCalledWith(actions.addTodo('Pay the rent'));
  });
  it('does not let you add empty todos, and show the message "Todo\'s can\'t be empty"', () => {
    const spy = jest.spyOn(actions, 'addTodo');
    renderComponent();
    expect(screen.queryByText("Todo's can't be empty")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(spy).not.toHaveBeenCalled();
    expect(screen.getByText("Todo's can't be empty")).toBeInTheDocument();
  });
  it('does not let you add existing todos and show the message "This Todo already exists"', () => {
    const spy = jest.spyOn(actions, 'addTodo');
    renderComponent();
    typeAndAddNewTodo('Clean the kitchen');
    expect(
      screen.queryByText('This Todo already exists')
    ).not.toBeInTheDocument();
    typeAndAddNewTodo('Clean the kitchen');
    expect(screen.getByText('This Todo already exists')).toBeInTheDocument();
    expect(spy).toHaveBeenCalledTimes(1); // second called not triggered
  });
});
