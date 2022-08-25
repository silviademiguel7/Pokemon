import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PokemonList } from './pages/PokemonList/PokemonList';
import { PokemonDetail } from './pages/PokemonDetail/PokemonDetail';

export const App = () => {
  return (
    <BrowserRouter>
      <div className='App-wrapper'>
        <Routes>
          <Route path='/' element={<Navigate to='/pokemons' replace />} />
          <Route path='/pokemons/:id' element={<PokemonDetail />} />
          <Route path='/pokemons' element={<PokemonList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
