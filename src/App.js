
import './App.css';
import SearchBox from './components/SearchBox';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SearchBox/>}/>
      </Routes>
    </div>
  );
}

export default App;
