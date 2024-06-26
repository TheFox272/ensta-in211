import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/home">
        Home
      </Link>
      <div>|</div>
      <Link className="Link" to="/">
        Connect
      </Link>
      <div>|</div>
      <Link className="Link" to="/playlists">
        Playlists
      </Link>
      <div>|</div>
      <Link className="Link" to="/users">
        Users
      </Link>
      <div>|</div>
      <Link className="Link" to="/about">
        About
      </Link>
    </div>
  );
};

export default Header;
