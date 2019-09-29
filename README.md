# use-request

</a>
<a href="https://www.npmjs.com/package/@rekindle/use-request" target="\_parent">
<img alt="" src="https://img.shields.io/npm/dm/@rekindle/use-request.svg" />
</a>
<a href="https://www.npmjs.com/package/@rekindle/use-request" target="\_parent">
<img alt="" src="https://img.shields.io/npm/v/@rekindle/use-request.svg" />
</a>

A Tiny Custom React hooks for making request.

## Feature

- 👕 Typescript support.
- 🗜️ 1.3kb after minified without gzip.
- 📤 Easy to use with different request clinet.

## Install

```bash
yarn add @rekindle/use-request
```

## Basic Usage

```jsx
import useRequest from '@rekindle/use-request'
import getFooApi from '@/utils/axios'

function App () {
  const [{ loading, error, data }, fetch] = useRequest(getFooApi)

  useEffect(() => { fetch() }, [fetch])

  if (loading) return 'loading'
  if (error) return 'error'

  return data && <div>{data}</div>
}
```

## More Example

> Queries are typically start with loading, we can create a `useQuery` function before we use.

```js
function useQuery (api) {
  return useRequest(api, { loading: true })
}
```

### Query

```jsx
function Query () {
  const [{ loading, error, data }, fetch] = useQuery(queryFooApi)

  useEffect(() => { fetch() }, [fetch])

  if (loading) return 'loading...'
  if (error) return 'error'

  // no need to check data
  return <div>{data}</div>
}
```

### Multi Query

```jsx
function MultiQuery () {
  const [foo, fetchFoo] = useQuery(queryFooApi)
  const [bar, fetchBar] = useQuery(queryBarApi)

  useEffect(() => {
    fetchFoo()
    fetchBar()
  }, [fetchFoo, fetchBar])

  const renderContent = (state) => {
    const { loading, error, data } = state

    if (loading) return 'loading...'
    if (error) return 'error'

    return <div>{data}</div>
  }

  return (
    <div>
      {renderContent(foo)}
      {renderContent(bar)}
    </div>
  )
}
```

### Batch Query

```jsx
function BatchQuery () {
  const batchFetchApi = () => Promise.all([queryFooApi(), queryBarApi()])
  const [{ loading, error, data }, fetch] = useQuery(batchFetchApi)

  useEffect(() => { fetch() }, [fetch])

  if (loading) return 'loading...'
  if (error) return 'error'

  const [foo, bar] = data

  return (
    <div>
      <div>{foo}</div>
      <div>{bar}</div>
      <button onClick={fetch}>refetch batch</button>
    </div>
  )
}
```

### Mutate

```jsx
function Mutate () {
  const [{ loading, error, data }, mutate] = useRequest(mutateBazApi)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (error) alert('error')
    if (data === 'success') alert('success')
  }, [error, data])

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button disabled={loading} onClick={() => mutate(value)}>submit</button>
    </div>
  )
}
```

## Api

```ts
type useRequest = (api, initialState) => [state, memoizedRequestCallback]
```

Notice: Why _momoized_ request callback ?

Reference: [Is it safe to omit functions from the list of dependencies?](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)

If you want a deep dive on useEffect and dependencies, it's here: https://overreacted.io/a-complete-guide-to-useeffect/

## Contribution

PR & issue welcome.

## License

MIT
