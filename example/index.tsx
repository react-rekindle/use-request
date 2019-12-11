import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import useRequest from '../src'
import { listAllBreeds, getRandomImagesOfBreeds, transform } from './axios'

const App: React.FC = () => {
  const [{ loading, error, data }, fetchList] = useRequest(listAllBreeds)
  const [imageState, fetchImage] = useRequest(getRandomImagesOfBreeds)

  function handleClick(breed: string): void {
    fetchImage(breed)
  }

  React.useEffect(() => {
    fetchList()
  }, [fetchList])

  const renderImage = () => {
    const { loading, error, data } = imageState

    if (loading) return <div>loading...</div>
    if (error) return <div>error</div>

    return data && <img src={data} />
  }

  if (loading) return <div>loading...</div>
  if (error) return <div>error</div>

  const list = transform(data || {})

  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.key} onClick={() => handleClick(item.key)}>
            {item.value}
          </li>
        ))}
      </ul>
      <div style={{ position: 'fixed', top: 0, right: 0 }}>{renderImage()}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
