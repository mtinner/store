import * as fromStore from './store';

import {renderTodos} from './utils';
import {ActionsType} from "./store/actions";

const reducers = {
  todos: fromStore.reducer
};
const store = new fromStore.Store(reducers);

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const payload = {label: input.value, complete: false};

    store.dispatch(new fromStore.AddTodo(payload));

    input.value = '';
  },
  false
);

todoList.addEventListener('click', function (event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    const todo = JSON.parse(target.getAttribute('data-todo') || '{}');
    store.dispatch({type: ActionsType.REMOVE_TODO, payload: todo});
  }
});

const unsubscribe = store.subscribe(state => renderTodos(state.todos.todos));

destroy.addEventListener('click', unsubscribe, false);

store.subscribe(state => {
  console.log(state);
});
