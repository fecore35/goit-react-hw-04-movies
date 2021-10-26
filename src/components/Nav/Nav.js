import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul className="menu">
        <li className="item">
          <NavLink exact to="/" className="link" activeClassName="activeLink">
            Home
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/movies" className="link" activeClassName="activeLink">
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
