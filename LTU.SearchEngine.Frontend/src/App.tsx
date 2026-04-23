import { Navigate, Route, Routes } from 'react-router-dom';
import './css/App.css';
import { SearchView } from './views/SearchView';
import { useSearchLanguageReDirector } from './hooks/useSearchLanguageReDirector';
import { LanguageToggle } from './components/LanguageToggle';



function App() {
  useSearchLanguageReDirector();
  
  return (
    <>
      <header className='app-header'>
        <h1>LTU Search Engine</h1>
        <LanguageToggle />
      </header>
      <main>
      <Routes>
        <Route path='/' element={null} />
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