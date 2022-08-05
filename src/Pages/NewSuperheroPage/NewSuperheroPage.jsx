import { useState, useMemo } from 'react';
import createSuperhero from '../../shared/services/createSuperhero';
import Notiflix from 'notiflix';
import styles from './NewSuperheroPage.module.scss';

const blankFormData = {
  nickname: '',
  realName: '',
  catchPhrase: '',
  originDescription: '',
  superpowers: [],
};

const NewSuperhero = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHeroCreated, setIsHeroCreated] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    realName: '',
    catchPhrase: '',
    originDescription: '',
    superpowers: [],
  });
  const [superpower, setSuperpower] = useState([]);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSuperpowerChange = e => {
    setSuperpower(e.target.value);
  };

  const onAddButtonClick = () => {
    const superpowerArray = formData.superpowers;
    const repeatedSuperpower = superpowerArray.find(
      elem => elem === superpower
    );

    if (repeatedSuperpower) {
      Notiflix.Notify.failure('This superpower already exists');
      return;
    }
    setFormData({
      ...formData,
      superpowers: [...superpowerArray, superpower],
    });

    setSuperpower('');
  };

  const superpowersMarkup = useMemo(() => {
    return formData.superpowers.map(elem => <p key={elem}>{elem}</p>);
  }, [formData.superpowers]);

  const onSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('superpowers', formData.superpowers);
    data.append('nickname', formData.nickname);
    data.append('realName', formData.realName);
    data.append('catchPhrase', formData.catchPhrase);
    data.append('originDescription', formData.originDescription);
    data.append('avatar', e.target.avatar.files[0]);
    setIsHeroCreated(false);
    setLoading(true);
    setError(null);
    try {
      const createdHero = await createSuperhero(data);
      setFormData(blankFormData);
      e.target.avatar.value = null;
      setLoading(false);
      setIsHeroCreated(true);
      console.log('success');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  if (error) Notiflix.Notify.failure(error.message);
  if (isHeroCreated) Notiflix.Notify.success('Superhero is created');
  return (
    <>
      <h1>Create a superhero</h1>
      <form
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <label>
          Avatar
          <input required name="avatar" type="file" />
        </label>
        <label>
          Nickname
          <input
            required
            value={formData.nickname}
            onChange={handleChange}
            name="nickname"
          />
        </label>
        <label>
          Real Name
          <input
            required
            value={formData.realName}
            onChange={handleChange}
            name="realName"
          />
        </label>
        <label>
          Origin description
          <input
            required
            onChange={handleChange}
            value={formData.originDescription}
            name="originDescription"
          />
        </label>
        <label>
          Superpowers
          <input
            onChange={handleSuperpowerChange}
            value={superpower}
            name="superpowers"
          />
          <button type="button" onClick={onAddButtonClick}>
            Add
          </button>
          <div>{superpowersMarkup}</div>
        </label>
        <label>
          Catchphrase
          <input
            required
            value={formData.catchPhrase}
            onChange={handleChange}
            name="catchPhrase"
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      {loading ? <p>...loading</p> : undefined}
    </>
  );
};
export default NewSuperhero;
