# use-request

</a>
<a href="https://npmjs.com/package/vue-show" target="\_parent">
<img alt="" src="https://img.shields.io/npm/dm/vue-show.svg" />
</a>
<a href="https://npmjs.com/package/vue-show" target="\_parent">
<img alt="" src="https://img.shields.io/npm/v/vue-show.svg" />
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

## Usage

```jsx
import useRequest from '@rekindle/use-request'
import getFooApi from '@/utils/axios'

function App() {
  const [{ loading, error, data }, fetch] = useRequest(getFooApi)

  function handleClick() {
    fetch()
  }

  useEffect(() => {
    fetch()
  }, [fetch])

  if (loading) return <div>loading...</div>
  if (error) return <div>error</div>

  return (
    <div>
      <p>{data && data.text}</p>
      <button onClick={handleClick}>refetch</button>
    </div>
  )
}
```

## Api

```ts
type useRequest = (api, initialState) => [state, memoizedRequestCallback]
```

## Contribution

PR & issue welcome.

## License

MIT
