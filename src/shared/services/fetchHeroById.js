import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/superhero',
});

const fetchHeroById = async id => {
  const {data} = await instance.get(`/${id}`);
  return data
};
export default fetchHeroById;