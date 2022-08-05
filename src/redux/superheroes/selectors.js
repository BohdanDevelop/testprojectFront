const selectHeroes = value => value.superheroes;
const selectTotal = value => {
  return value.superheroes.total;
};
const selectors = {
  selectHeroes,
  selectTotal,
};
export default selectors;
