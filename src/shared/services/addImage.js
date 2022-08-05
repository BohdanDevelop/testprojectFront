import axios from 'axios';

const instance = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' },
  baseURL: 'http://localhost:8080/api/superhero',
});

const addImage = async ({ id, info }) => {
  const { data } = await instance.post(`/${id}/photos`, info);
  return data;
};
export default addImage;
