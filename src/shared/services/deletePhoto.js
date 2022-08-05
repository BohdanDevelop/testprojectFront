import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8080/api/superhero',
});
const deletePhoto = async ({ id, info }) => {
  const { data } = await instance.patch(`/${id}/photos/delete`, { src: info });
  return data;
};
export default deletePhoto;
