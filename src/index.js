import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { TODO_ADD, TODO_TOGGLE, SHOW_ALL } from "./const";

import "./styles.css";
const FILTER_SET = "FILTER_SET";

const initialState = {
  currentUser: null,
  todos: [],
  filter: "SHOW_ALL"
};
const rootReducer = combineReducers({
  todoReducer: todoReducer,
  filterState: filterReducer
});
const store = createStore(rootReducer);

console.log("initial state:");
console.log(store.getState());

// Start subscribe the store's behavie
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

//Action creator -- return a plain action
function doAddTodo(id, name) {
  return {
    type: TODO_ADD,
    payload: {
      todo: { id, name }
    }
  };
}

function doToggleTodo(id) {
  return {
    type: TODO_TOGGLE,
    payload: {
      todo: { id }
    }
  };
}

function doSetFilter(filter) {
  return {
    type: FILTER_SET,
    payload: {
      filter
    }
  };
}

// replace the parameter plain Action with an Action creator
store.dispatch(doAddTodo("0", "Learn Redux"));
store.dispatch(doAddTodo("1", "Learn Mobx"));
store.dispatch(doToggleTodo("0"));
store.dispatch(doSetFilter("COMPLETED"));
// Stop subscribe
unsubscribe();

// Reducer is pure function return an object which hanle the state carefully
function todoReducer(state = [], action) {
  const { payload } = action;
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, payload);
    }

    case TODO_TOGGLE: {
      return applyToggleTodo(state, payload);
    }

    default:
      return state;
  }
}

function filterReducer(state = SHOW_ALL, action) {
  const { payload } = action;
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, payload);
    }

    default:
      return state;
  }
}

function applyAddTodo(state, action) {
  // minimum Action payload
  const todo = Object.assign({}, action.todo, { completed: false });
  return state.concat(todo);
}

function applyToggleTodo(state, action) {
  return state.map(
    todo =>
      todo.id === action.todo.id
        ? Object.assign({}, todo, { completed: !todo.completed })
        : todo
  );
}

function applySetFilter(state, action) {
  return action.filter;
}

const rootElement = document.getElementById("root");
