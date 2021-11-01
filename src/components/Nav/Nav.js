import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";

function Nav() {
  return (
    <nav>
      <ul className={s.menu}>
        <li className={s.item}>
          <NavLink exact to="/" className={s.link} activeClassName={s.active}>
            Home
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/movies" className={s.link} activeClassName={s.active}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
