import { Outlet, NavLink } from 'react-router-dom';
import Header from '../Header';
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
export default Layout;
