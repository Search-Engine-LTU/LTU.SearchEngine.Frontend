import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { SearchView } from './views/SearchView';
import { useSearchLanguageReDirector } from './hooks/useSearchLanguageReDirector';


/**
 * The Root Component of the application.
 * @description
 * 1. Initializes `useSearchLanguageReDirector` to handle cookie-based entry redirects.
 * 2. Defines the UI shell (Header/Main).
 * 3. Configures the React Router `Routes` tree:
 * - '/' : The landing "lobby" where redirection is processed.
 * - '/en' & '/sv' : Localized versions of the search interface.
 * - '*' : A catch-all safety route for invalid URLs.
 */
function App() {
  useSearchLanguageReDirector();
  
  return (
    <>
      <header>
        <h1>LTU Search Engine</h1>
      </header>
      <main>
      <Routes>
        {/* Hock handles redirect here.*/}
        <Route path='/' element={ <SearchView /> } />

        <Route path='/en' element={ <SearchView />} />
        <Route path='/sv' element={ <SearchView />} />
       
       
        {/* Fallback on typos */}
        <Route path='*' element={ <Navigate to='/sv' />} /> 
      </Routes>
      </main>
    </>
  );
}

export default App