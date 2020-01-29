import { ActionType, StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('src/store/index').default>;
  export type RootState = StateType<typeof import('src/store/root-reducer').default>;
  export type RootAction = ActionType<typeof import('src/store/root-action').default>;

  interface Types {
    RootAction: RootAction;
  }
}
