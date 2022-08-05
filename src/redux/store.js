import { configureStore } from '@reduxjs/toolkit';
import superheroesReducer from './superheroes/superheroesSlice';
import distinctSuperheroReducer from './distinctSuperHero/distinctSuperHeroSlice';
export const store = configureStore({
  reducer: {
    superheroes: superheroesReducer,
    distinctSuperhero: distinctSuperheroReducer,
  },
});
