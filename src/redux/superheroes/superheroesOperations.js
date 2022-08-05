import { createAsyncThunk } from '@reduxjs/toolkit';
import getHeroes from 'shared/services/fetchHeroes';
const fetchHeroes = createAsyncThunk(
  'superheroes/fetch',
  async (p, { rejectWithValue }) => {
    try {

      const data = await getHeroes(p);
 
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const operations = {
  fetchHeroes,
};
export default operations;
