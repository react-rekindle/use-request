import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useRequest from '../src';

interface DataType {
  text: string;
}

interface ResponseType {
  data: DataType;
  code: number;
  message?: string | undefined;
}

const exampleData: ResponseType = {
  data: { text: 'Hello World!' },
  code: 200,
}

function fakeGetFooApi (id?: string): Promise<ResponseType> {
  return new Promise<ResponseType>(
    resolve => setTimeout(() => resolve(exampleData), 1000)
  )
}

const App: React.FC = () => {
  const [{ data, loading, error }, fetch] = useRequest(fakeGetFooApi)
  
  React.useEffect(() => { fetch() }, [fetch])
  
  if (loading) return <div>loading...</div>
  if (error) return <div>error</div>
  
  return (
    <div>
      {data && data.data.text}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
