import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import SuperheroesPage from '../Pages/SuperheroesPage';
import DistinctSuperheroPage from '../Pages/DistinctSuperheroPage';
import NewSuperheroPage from '../Pages/NewSuperheroPage';
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SuperheroesPage />} />
        <Route path="superhero/:id" element={<DistinctSuperheroPage />} />
        <Route path="newsuperhero" element={<NewSuperheroPage />} />
      </Route>
    </Routes>
  );
};
