import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink className={styles.home} to="/">
        Home
      </NavLink>
      <NavLink className={styles.create} to="newsuperhero">
        Create Superhero
      </NavLink>
    </header>
  );
};
export default Header;
