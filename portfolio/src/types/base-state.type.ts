export enum StateStatus {
    INIT = 'init',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
  }
  
  export type BaseState = {
    status: StateStatus;
    error: string | null | undefined;
  };