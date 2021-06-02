import {
  RiHome5Fill,
  RiHome5Line,
  RiSearchLine,
  RiSearchFill,
  RiNotification3Fill,
  RiNotification3Line
} from "react-icons/ri";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  // const { activeNavLink } = useNav();
  const activeNavLink = "home"
  return (
    <div className="navbar-mobile">
      <Link to="/">
        <div className="btn-nav">
          <div className="icon">
            {activeNavLink === "home" ? <RiHome5Fill /> : <RiHome5Line />}
          </div>
          {/* <div className="heading">Home</div> */}
        </div>
      </Link>

      <Link to="/search">
        <div className="btn-nav">
          <div className="icon">
            {activeNavLink === "search" ? <RiSearchFill /> : <RiSearchLine />}
          </div>
          {/* <div className="heading">Games</div> */}
        </div>
      </Link>

      <Link to="/notifications">
        <div className="btn-nav">
          <div className="icon">
            {activeNavLink === "notifications" ? <RiNotification3Fill /> : <RiNotification3Line />}
          </div>
          {/* <div className="heading">Guides</div> */}
        </div>
      </Link>

      
    </div>
  );
};
