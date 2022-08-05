import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchHeroById from '../../shared/services/fetchHeroById';
import operations from '../../redux/distinctSuperHero/distinctSuperHeroOperations';
import selector from '../../redux/distinctSuperHero/selectors';
import deleteHeroById from '../../shared/services/deleteHeroById';
import { useNavigate } from 'react-router-dom';
import EditButton from '../../components/EditButton';
import ChangeAvatar from '../../components/ChangeAvatar';
import Notiflix from 'notiflix';
import styles from './DistinctSuperheroPage.module.scss';

const DistinctSuperheroPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [inputNickname, setInputNickname] = useState(false);
  const [inputRealName, setInputRealName] = useState(false);
  const [inputDescription, setInputDescription] = useState(false);
  const [inputCatchphrase, setInputCatchphrase] = useState(false);
  const [inputSuperpowers, setInputSuperpowers] = useState(false);

  const onEditButtonClick = type => {
    switch (type) {
      case 'nickname':
        setInputNickname(true);
        break;
      case 'realName':
        setInputRealName(true);
        break;
      case 'originDescription':
        setInputDescription(true);
        break;
      case 'catchPhrase':
        setInputCatchphrase(true);
        break;
      case 'superpowers':
        setInputSuperpowers(true);
        break;
      default:
        console.log('nothing matched');
    }
  };
  const onSubmit = (e, field) => {
    e.preventDefault();
    const value = e.target[field].value;
    if (!value) {
      Notiflix.Notify.failure('There is no value');
    }
    if (field === 'superpowers' && value) {
      dispatch(
        operations.updateSuperhero({
          id: params.id,
          data: {
            [field]: [value, ...superhero.superhero.superpowers],
          },
        })
      );
    } else if (value && field !== 'superpowers') {
      dispatch(
        operations.updateSuperhero({
          id: params.id,
          data: { [field]: value },
        })
      );
    }

    switch (field) {
      case 'nickname':
        setInputNickname(false);
        break;
      case 'realName':
        setInputRealName(false);
        break;
      case 'originDescription':
        setInputDescription(false);
        break;
      case 'catchPhrase':
        setInputCatchphrase(false);
        break;
      case 'superpowers':
        setInputSuperpowers(false);
        break;
      default:
        console.log('nothing matched');
    }
  };
  const editForm = field => {
    return (
      <form onSubmit={e => onSubmit(e, field)}>
        <input type="text" name={field} id="" />
        <button type="submit">Submit</button>
      </form>
    );
  };
  const superhero = useSelector(selector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(operations.getHeroById(params.id));
  }, [params.id, dispatch]);
  const onDeleteButton = async id => {
    setLoading(true);
    try {
      await deleteHeroById(id);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const onChangeAvatarSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', e.target.avatar.files[0]);
    dispatch(operations.updateAvatar({ id: params.id, data }));
  };

  const onImageAdd = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', e.target.image.files[0]);
    dispatch(operations.addNewPhoto({ id: params.id, info: data }));
  };
  const onDeletePhotoButton = src => {
    dispatch(operations.deleteSuperheroPhoto({ id: params.id, info: src }));
  };

  if (superhero.loading && !superhero.superhero.nickname) {
    return <h1>...loading</h1>;
  }
  if (superhero.superhero.nickname) {
    const baseURL = 'http://localhost:8080/';
    const photos = superhero.superhero.images.map(elem => {
      return (
        <li key={elem}>
          <button type="button" onClick={() => onDeletePhotoButton(elem)}>
            X
          </button>
          <img width="100" src={`${baseURL}${elem}`} alt="additional" />
        </li>
      );
    });
    return (
      <section className={styles.section}>
        {superhero.loading ? <h1>...loading</h1> : undefined}
        <div>
          <p className={styles.avatar}>Avatar</p>
          <img
            width="400"
            src={`${baseURL}${superhero.superhero.avatar}`}
            alt={superhero.superhero.nickname}
          />
          <ChangeAvatar
            name="avatar"
            buttonName="Change avatar"
            onSubmit={onChangeAvatarSubmit}
          />
        </div>
        <div className={styles.field}>
          <h1>Nickname: {superhero.superhero.nickname}</h1>
          <EditButton onClick={() => onEditButtonClick('nickname')} />
          {inputNickname ? editForm('nickname') : undefined}
        </div>
        <div className={styles.field}>
          <h2>Real Name: {superhero.superhero.realName}</h2>
          <EditButton onClick={() => onEditButtonClick('realName')} />
          {inputRealName ? editForm('realName') : undefined}
        </div>
        <div className={styles.field}>
          <p>Superpowers: {superhero.superhero.superpowers.join(' ')}</p>
          <EditButton onClick={() => onEditButtonClick('superpowers')} />
          {inputSuperpowers ? editForm('superpowers') : undefined}
        </div>
        <div className={styles.field}>
          <p>Description: {superhero.superhero.originDescription}</p>
          <EditButton onClick={() => onEditButtonClick('originDescription')} />
          {inputDescription ? editForm('originDescription') : undefined}
        </div>
        <div className={styles.field}>
          <p>Catch phrase: {superhero.superhero.catchPhrase}</p>
          <EditButton onClick={() => onEditButtonClick('catchPhrase')} />
          {inputCatchphrase ? editForm('catchPhrase') : undefined}
        </div>

        <div className={styles.field}>
          <p>Another photos:</p>
          <ul>{photos}</ul>
          <ChangeAvatar
            buttonName="Add photo"
            name="image"
            onSubmit={onImageAdd}
          />
        </div>
        <button
          className={styles.delete}
          type="button"
          onClick={() => onDeleteButton(superhero.superhero._id)}
        >
          Delete
        </button>
      </section>
    );
  }
  if (superhero.error) {
    return <p>{superhero.error}</p>;
  }
};
export default DistinctSuperheroPage;
