import * as fromActions from './actions';
import {Action, ActionsType} from "./actions";

export const initialState = {
  loaded: false,
  loading: false,
  todos: [{label: 'Eat Pizza', complete: false}]
};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionsType.ADD_TODO: {
      const todo = action.payload;
      const todos = [...state.todos, todo];
      return {
        ...state,
        todos
      }
    }
    case ActionsType.REMOVE_TODO: {
      const todos = state.todos.filter(todo => todo.label !== action.payload.label);
      return {
        ...state,
        todos
      };
    }
  }

  return state;
}
