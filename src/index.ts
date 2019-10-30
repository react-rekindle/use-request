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
function reducer<T extends IState<T>> (state: T,action: IAction<T>): IState<T> | never {
  switch (action.type) {
    case REQUEST_INIT:
      return { ...defaultInitialState, loading: true }
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
): Promise<ReturnType<T>> {
  try {
    dispatch({ type: REQUEST_INIT })
    const result = await instance()
    dispatch({ type: REQUEST_SUCCESS, payload: result })
    return result
  } catch (error) {
    dispatch({ type: REQUEST_FAILURE, error })
    throw error
  }
}

/**
 *  main function
 *
 * @template T
 * @param {T} instance
 * @param {IState<Unpacked<ReturnType<T>>>} [initialState]
 * @returns
 */
function useRequest<T extends (...args: any[]) => any> (
  instance: T,
  initialState?: IState<Unpacked<ReturnType<T>>>
) {
  const initialIState = {
    ...defaultInitialState,
    ...initialState,
  }
  const [state, dispatch] = useReducer(reducer, initialIState)

  function requestCallback (...args: Parameters<T>) {
    return request((): Unpacked<ReturnType<T>> => instance(...args), dispatch)
  }

  const memoizedRequestCallback = useCallback(requestCallback, [])

  return [state, memoizedRequestCallback] as const
}

export default useRequest
