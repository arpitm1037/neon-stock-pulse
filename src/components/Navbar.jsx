import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/watchlist', label: 'Watchlist' },
];

const Navbar = () => (
  <header className="nav">
    <div className="nav__brand">
      <span className="nav__logo">⚡</span>
      <div>
        <p className="nav__title">Neon Stock Pulse</p>
        <small className="nav__subtitle">NSE • BSE • Cyber vibes</small>
      </div>
    </div>

    <nav className="nav__links">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            isActive ? 'nav__link nav__link--active' : 'nav__link'
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </header>
);

export default Navbar;

