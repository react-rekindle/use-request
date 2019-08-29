import { useReducer, useCallback } from 'react'
import { ActionType, IState, IAction, Unpacked } from './types'

/** define request status in three types */
const REQUEST_INIT: ActionType = 'REQUEST_INIT'
const REQUEST_SUCCESS: ActionType = 'REQUEST_SUCCESS'
const REQUEST_FAILURE: ActionType = 'REQUEST_FAILURE'

/** define default initial state */
const defaultInitialState: IState<null> = {
  loading: false,
  data: null,
  error: null,
}

/**
 *reducer function
 *
 * @template T
 * @param {T} state
 * @param {IAction<T>} action
 * @returns {IState<T>}
 */
function reducer<T> (state: T,action: IAction<T>): IState<T> {
  switch (action.type) {
    case REQUEST_INIT:
      return { ...state, loading: true, error: null }
    case REQUEST_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      throw new Error('error')
  }
}

/**
 * request function
 *
 * @template T
 * @param {T} instance
 * @param {(aciton: IAction<ReturnType<T>>) => void} dispatch
 * @returns {Promise<void>}
 */
async function request<T extends (...args: any[]) => any> (
  instance: T,
  dispatch: (aciton: IAction<ReturnType<T>>) => void,
): Promise<void> {
  try {
    dispatch({ type: REQUEST_INIT })
    const result = await instance()
    dispatch({ type: REQUEST_SUCCESS, payload: result })
  } catch (error) {
    dispatch({ type: REQUEST_FAILURE, error })
    throw error
  }
}

/**
 * main function
 *
 * @template T
 * @param {T} instance
 * @param {IState<Unpacked<ReturnType<T>>>} [initialState]
 * @returns {[IState<Unpacked<ReturnType<T>>>, (...args: Parameters<T>) => void]}
 */
function useRequest<T extends (...args: any[]) => any> (
  instance: T,
  initialState?: IState<Unpacked<ReturnType<T>>>
): [IState<Unpacked<ReturnType<T>>>, (...args: Parameters<T>) => void] {
  const initialIState: IState<Unpacked<ReturnType<T>>> = {
    ...defaultInitialState,
    ...initialState,
  };
  const [state, dispatch] = useReducer(reducer, initialIState);

  function requestCallback (...args: Parameters<T>): void {
    request((): Unpacked<ReturnType<T>> => instance(...args), dispatch);
  }

  const memoizedRequestCallback = useCallback(requestCallback, []);

  return [state, memoizedRequestCallback];
}

export default useRequest
