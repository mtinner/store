export enum ActionsType {
  ADD_TODO,
  REMOVE_TODO
}

export interface Action {
  type: ActionsType,
  payload: any
}

export class AddTodo implements Action{
  readonly type = ActionsType.ADD_TODO;

  constructor(public payload: any) {
  }
}
