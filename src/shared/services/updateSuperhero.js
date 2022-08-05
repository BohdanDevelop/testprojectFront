import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8080/api/superhero',
});

const updateSuperhero = async (id, updateData) => {
  const { data } = await instance.patch(`${id}`, updateData);
  return data;
};
export default updateSuperhero;
