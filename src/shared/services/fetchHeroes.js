import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/superhero',
});

const fetchHeroes = async (page) => {
  try {
    const { data } = await instance.get('/', {
      params: {
        page,
        limit:5,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchHeroes;
