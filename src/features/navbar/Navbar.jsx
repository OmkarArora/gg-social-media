import {
  RiHome5Fill,
  RiHome5Line,
  RiSearchLine,
  RiSearchFill,
  RiNotification3Fill,
  RiNotification3Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  // const { activeNavLink } = useNav();
  const activeNavLink = "home";
  return (
    <div className="navbar-mobile">
      <Link to="/">
        <div className="btn-nav">
          <div className={activeNavLink === "home" ? "icon icon-fill" : "icon"}>
            {activeNavLink === "home" ? <RiHome5Fill /> : <RiHome5Line />}
          </div>
          {/* <div className="heading">Home</div> */}
        </div>
      </Link>

      <Link to="/search">
        <div className="btn-nav">
          <div
            className={activeNavLink === "search" ? "icon icon-fill" : "icon"}
          >
            {activeNavLink === "search" ? <RiSearchFill /> : <RiSearchLine />}
          </div>
        </div>
      </Link>

      <Link to="/notifications">
        <div className="btn-nav">
          <div
            className={
              activeNavLink === "notifications" ? "icon icon-fill" : "icon"
            }
          >
            {activeNavLink === "notifications" ? (
              <RiNotification3Fill />
            ) : (
              <RiNotification3Line />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
