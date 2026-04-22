import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { SearchView } from './views/SearchView';


function App() {

  return (
    <>
      <header>
        <h1>LTU Search Engine</h1>
      </header>
      <main>
      <Routes>
        <Route path='/en' element={ <SearchView />} />
        <Route path='/sv' element={ <SearchView />} />
        {/* Fallback to Swedish version */}
        <Route path='*' element={ <Navigate to='/sv' />} /> 
      </Routes>
      </main>
    </>
  );
}

export default App