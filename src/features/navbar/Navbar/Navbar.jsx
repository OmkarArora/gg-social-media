import {
  RiHome5Fill,
  RiHome5Line,
  RiSearchLine,
  RiSearchFill,
  RiNotification3Fill,
  RiNotification3Line,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const { activeTab } = useSelector((state) => state.nav);
  return (
    <div className="navbar-mobile">
      <Link to="/">
        <div className="btn-nav">
          <div className={activeTab === "home" ? "icon icon-fill" : "icon"}>
            {activeTab === "home" ? <RiHome5Fill /> : <RiHome5Line />}
          </div>
          <div
            className={
              activeTab === "home" ? "nav-heading highlight" : "nav-heading"
            }
          >
            Home
          </div>
        </div>
      </Link>

      <Link to="/search">
        <div className="btn-nav">
          <div className={activeTab === "search" ? "icon icon-fill" : "icon"}>
            {activeTab === "search" ? <RiSearchFill /> : <RiSearchLine />}
          </div>
          <div
            className={
              activeTab === "search" ? "nav-heading highlight" : "nav-heading"
            }
          >
            Search
          </div>
        </div>
      </Link>

      <Link to="/notifications">
        <div className="btn-nav">
          <div
            className={
              activeTab === "notifications" ? "icon icon-fill" : "icon"
            }
          >
            {activeTab === "notifications" ? (
              <RiNotification3Fill />
            ) : (
              <RiNotification3Line />
            )}
          </div>
          <div
            className={
              activeTab === "notifications"
                ? "nav-heading highlight"
                : "nav-heading"
            }
          >
            Notifications
          </div>
        </div>
      </Link>
    </div>
  );
};
