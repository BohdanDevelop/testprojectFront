import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchHeroById from 'shared/services/fetchHeroById';
import updateSuperheroRequest from 'shared/services/updateSuperhero';
import changeAvatar from 'shared/services/changeAvatar';
import addImage from 'shared/services/addImage';
import deletePhoto from 'shared/services/deletePhoto';
const getHeroById = createAsyncThunk(
  'superhero/fetch',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchHeroById(id);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const updateSuperhero = createAsyncThunk(
  'superhero/update',
  async (info, { rejectWithValue }) => {
    try {
      const data = await updateSuperheroRequest(info.id, info.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const updateAvatar = createAsyncThunk(
  'superhero/updateAvatar',
  async (data, { rejectWithValue }) => {
    try {
      const responseAvatar = await changeAvatar(data);
      return responseAvatar;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const addNewPhoto = createAsyncThunk(
  'superhero/addPhoto',
  async (data, { rejectWithValue }) => {
    try {
      const response = await addImage({ id: data.id, info: data.info });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const deleteSuperheroPhoto = createAsyncThunk(
  'superhero/deletePhoto',
  async (data, { rejectWithValue }) => {
    try {
      const response = await deletePhoto({ id: data.id, info: data.info });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const operations = {
  updateSuperhero,
  getHeroById,
  updateAvatar,
  addNewPhoto,
  deleteSuperheroPhoto,
};
export default operations;
