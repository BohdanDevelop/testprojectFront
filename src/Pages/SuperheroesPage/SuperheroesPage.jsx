import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import operations from '../../redux/superheroes/superheroesOperations';
import selectors from '../../redux/superheroes/selectors';
import styles from './SuperheroesPage.module.scss';
import { useCallback } from 'react';

const SuperheroesPage = () => {
  const heroes = useSelector(selectors.selectHeroes);
  const total = useSelector(selectors.selectTotal);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({ page: 0 });
  const p = searchParams.get('page');
  useEffect(() => {
    function getHeroes() {
      dispatch(operations.fetchHeroes(p));
    }

    getHeroes();
  }, [p, dispatch]);

  const onNextButtonClick = () => {
    setSearchParams({ page: Number(searchParams.get('page')) + 1 });
  };
  const onPreviousButtomClick = () => {
    setSearchParams({ page: Number(searchParams.get('page')) - 1 });
  };
  const disableButtonNext = useCallback(() => {
    const lastPage = Math.ceil(total / 5) - 1;

    if (lastPage === Number(p)) return true;
    else if (!heroes.superheroes.length) return true;
    else return false;
  }, [total, p, heroes.superheroes]);
  const disableButtonPrevious = useCallback(() => {
    if (Number(p) === 0) {
      return true;
    } else return false;
  }, [p]);

  if (!heroes.loading && !heroes.superheroes.length) {
    return <h1>There are no superheroes in database</h1>;
  }
  if (!heroes.loading && heroes.superheroes.length) {
    const heroesMarkup = heroes.superheroes.map(({ _id, nickname, avatar }) => {
      const baseURL = 'http://localhost:8080/';
      return (
        <li className={styles.li} key={avatar}>
          <Link to={`superhero/${_id}`}>
            <img width="300" src={`${baseURL}${avatar}`} alt={nickname} />
            <p>{nickname}</p>
          </Link>
        </li>
      );
    });

    return (
      <section className={styles.hero}>
        <h1 className={styles.heading}>Superheroes Page</h1>
        <div className={styles.buttonDiv}>
          <button
            className={styles.button}
            disabled={disableButtonNext()}
            type="button"
            onClick={onNextButtonClick}
          >
            Next page
          </button>
          <button
            className={styles.button}
            disabled={disableButtonPrevious()}
            type="button"
            onClick={onPreviousButtomClick}
          >
            Previous page
          </button>
        </div>
        <ul className={styles.ul}>{heroesMarkup}</ul>
      </section>
    );
  }
  if (heroes.loading) {
    return <h1>...Loading</h1>;
  }
  if (heroes.error) {
    return <h1>{heroes.error}</h1>;
  }
};
export default SuperheroesPage;
