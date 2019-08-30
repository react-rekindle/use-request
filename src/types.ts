
/** data type for user */
export type DataType<T> = T | null

/** TODO: add generics */
/** error type */
export type ErrorType = string | Error | null

/** action types */
export type ActionType =
  /** mark before request start status */
  | 'REQUEST_INIT'
  /** mark request success status */
  | 'REQUEST_SUCCESS'
  /** mark request failure status */
  | 'REQUEST_FAILURE'

/** state */
export interface IState<T> {
  loading: boolean;
  data: DataType<T>;
  error: ErrorType;
}

/** action */
export interface IAction<T> {
  type: ActionType;
  payload?: DataType<T>;
  error?: ErrorType;
}

/** utility type for unpacking a type */
export type Unpacked<T> =
  T extends (infer U)[] ? U :
  T extends (...args: any[]) => infer U ? U :
  T extends Promise<infer U> ? U :
  T