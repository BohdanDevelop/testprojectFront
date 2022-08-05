import axios from 'axios';
const instance = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' },
  baseURL: 'http://localhost:8080/api/superhero',
});

const changeAvatar = async ({ id, data }) => {
  console.log(id);
  console.log(data);
  const response = await instance.patch(`${id}/avatar`, data);
  return response.data;
};
export default changeAvatar;
