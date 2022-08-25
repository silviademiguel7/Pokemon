import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PokemonList } from './pages/PokemonList/PokemonList.tsx';
import { PokemonDetail } from './pages/PokemonDetail/PokemonDetail.tsx';

export const App = () => {
  return (
    <BrowserRouter>
      <div className='App-wrapper'>
        <Routes>
          <Route path='/' element={<Navigate to='/pokemons' replace />} />
          <Route exact path='/pokemons' element={<PokemonList />} />
          <Route path='/pokemons/:id' element={<PokemonDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
