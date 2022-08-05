import { createSlice } from '@reduxjs/toolkit';
import operations from './distinctSuperHeroOperations';

const initialState = {
  superhero: {},
  loading: false,
  error: null,
};

const superhero = createSlice({
  name: 'superhero',
  initialState,
  extraReducers: {
    [operations.getHeroById.pending]: (store, _) => {
      store.loading = true;
    },
    [operations.getHeroById.fulfilled]: (store, { payload }) => {
      store.superhero = payload;
      store.loading = false;
    },
    [operations.getHeroById.rejected]: (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    },
    [operations.updateSuperhero.pending]: (store, _) => {
      store.loading = true;
    },
    [operations.updateSuperhero.fulfilled]: (store, { payload }) => {
      store.superhero = payload;
      store.loading = false;
    },
    [operations.updateSuperhero.rejected]: (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    },
    [operations.updateAvatar.pending]: (store, _) => {
      store.loading = true;
    },
    [operations.updateAvatar.fulfilled]: (store, { payload }) => {
      store.superhero = payload;
      store.loading = false;
    },
    [operations.updateAvatar.rejected]: (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    },
    [operations.addNewPhoto.pending]: (store, _) => {
      store.loading = true;
    },
    [operations.addNewPhoto.fulfilled]: (store, { payload }) => {
      store.superhero = payload;
      store.loading = false;
    },
    [operations.addNewPhoto.rejected]: (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    },
    [operations.deleteSuperheroPhoto.pending]: (store, _) => {
      store.loading = true;
    },
    [operations.deleteSuperheroPhoto.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.superhero = payload;
    },
    [operations.deleteSuperheroPhoto.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },
  },
});
export default superhero.reducer;
