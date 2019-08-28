import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from './axios'
import useRequest from '../src';

interface DataType {
  data: {};
  code: number;
  message?: string | undefined;
}

function getFoo (id: string): Promise<DataType> {
  return axios.get(`/example/foo/${id}`)
}

const App = () => {
  const [state, fetch] = useRequest(getFoo)

  React.useEffect(() => {
    fetch('')
  }, [fetch])
  console.log(state)
  
  return (
    <div>
      123
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
