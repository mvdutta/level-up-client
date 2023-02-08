import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
      <div className="nav__container">
        <ul className="navbar">
          <li className="navbar__item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="nav-link" to="/games">
              Games
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="nav-link" to="/events">
              Events
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="nav-link" to="/creategame">
              Game Form
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="nav-link" to="/createevent">
              Event Form
            </Link>
          </li>
          {/* <li className="navbar__item">Navigation link</li> */}
          {localStorage.getItem("lu_token") !== null ? (
            <li className="nav-item">
              <button
                className="nav-link fakeLink"
                onClick={() => {
                  localStorage.removeItem("lu_token");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}{" "}
        </ul>
      </div>
    );
}
