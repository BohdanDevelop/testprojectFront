import axios from 'axios';
const instance = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' },
  baseURL: 'http://localhost:8080/api/superhero',
});

const createSuperhero = async data => {
  const response = await instance.post('/', data);
  return response.data;
};

export default createSuperhero;
