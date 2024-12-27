import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPenToSquare,
  faRightFromBracket,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isAuth, setIsAuth }) => {
  const handleSignOut = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <nav>
      <Link to="/">
        <FontAwesomeIcon icon={faHouse} />
        ホーム
      </Link>
      {!isAuth ? (
        <Link to="/login">
          <FontAwesomeIcon icon={faUser} />
          ログイン
        </Link>
      ) : (
        <>
          <Link to="/createpost">
            <FontAwesomeIcon icon={faPenToSquare} />
            記事投稿
          </Link>
          <Link to="/logout-success" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            ログアウト
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
