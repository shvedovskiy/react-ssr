declare module 'app-models' {
  export interface DataState {
    readonly userId?: number;
    readonly id?: number;
    readonly title?: string;
    readonly completed?: boolean;
  }
}
