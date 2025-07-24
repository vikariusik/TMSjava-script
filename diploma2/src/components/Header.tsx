import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            🎬 MovieFinder
          </Link>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Главная</Link>
            <a href="#" className="nav-link">Фильмы</a>
            <a href="#" className="nav-link">Сериалы</a>
            <a href="#" className="nav-link">Топ</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
