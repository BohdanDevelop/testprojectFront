import { createSlice } from '@reduxjs/toolkit';
import operations from './superheroesOperations';
const initialState = {
  superheroes: [],
  total: 0,
  loading: false,
  error: null,
};
const superheroesSlice = createSlice({
  name: 'superheroes',
  initialState,
  extraReducers: {
    [operations.fetchHeroes.pending]: (store, _) => ({
      ...store,
      loading: true,
    }),
    [operations.fetchHeroes.fulfilled]: (store, { payload }) => {
      return {
        ...store,
        loading: false,
        superheroes: payload.superheroes,
        total: payload.total,
      };
    },
    [operations.fetchHeroes.rejected]: (store, { payload }) => ({
      loading: false,
      payload: [],
      total: 0,
      error: payload,
    }),
  },
});
export default superheroesSlice.reducer;
