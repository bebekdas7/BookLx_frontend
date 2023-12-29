import { useState, useEffect } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SellIcon from "@mui/icons-material/Sell";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../styles/nav.css";
import axios from "axios";

const Nav = () => {
  const [activeLink, setActiveLink] = useState("buy-books");
  const [activeUser, setActiveUser] = useState(false);
  const [userData, setUserData] = useState([{}]);
  const check = localStorage.getItem("userId");

  useEffect(() => {
    const checkUser = async () => {
      const result = await axios.get(
        `http://localhost:8000/getUserData/${check}`
      );
      console.log(result);
      setUserData(result.data);
    };
    checkUser();
  }, []);
  // console.log(userData);

  const handleLinkClick = (link) => {
    console.log(link);
    setActiveLink(link);
    sessionStorage.setItem("activeLink", link);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("activeLink");
    if (stored) {
      setActiveLink(stored);
    }
  }, []);

  return (
    <nav className="nav d-flex justify-content-around align-items-center">
      <section className="logo d-flex justify-content-center align-items-center">
        <a
          href="/"
          className="d-flex justify-content-center align-items-end gap-2"
        >
          <h3 className="varela">
            <span className="book">BOOK</span> Lx
          </h3>
          <img src="images/logo.png" alt="images" width={40} height={60} />
        </a>
      </section>

      <section className="links d-none d-sm-flex justify-content-center align-items-center gap-4 p-2">
        <a
          href="/"
          className={`a buy-book d-flex justify-content-center align-items-start gap-1 ${
            activeLink === "buy-books" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("buy-books")}
        >
          <ShoppingBagIcon className="icon text-dark" />
          <h5 className="fs-6 text-center">Buy Books</h5>
        </a>

        <a
          href="/sell"
          className={`a sell-book d-flex justify-content-center align-items-start gap-1 ${
            activeLink === "sell-books" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("sell-books")}
        >
          <SellIcon className="icon text-dark" />
          <h5 className="fs-6 text-center">Sell Books</h5>
        </a>
      </section>

      <section className="btns d-flex justify-content-center gap-3">
        <a href="/saved-books" className="a">
          <BookmarkIcon className="icon" />
        </a>
        <a href="/cart" className="a">
          <ShoppingCartIcon className="icon" />
        </a>
        {userData.success == true ? (
          <>
            <button
              className="acc-icon"
              onClick={() => {
                setActiveUser(!activeUser);
                // console.log(activeUser);
              }}
            >
              <AccountCircleIcon className="icon" />
            </button>
            <div
              className={`user-extend d-flex flex-column justify-content-between align-items-center ${
                activeUser ? "" : "disable"
              } `}
            >
              <h6 className="text-center inc-sans fw-bold">
                WELCOME {userData.result.name.toUpperCase()}
              </h6>
              <a href="/profile" className="user-extend-inner">
                My Profile
              </a>
              <a href="/Order" className="user-extend-inner">
                My Order
              </a>
              <a href="/" onClick={handleLogout} className="user-extend-inner">
                Logout
              </a>
            </div>
          </>
        ) : (
          <a href="/signup" className="a">
            <LoginIcon className="icon" />
          </a>
        )}
      </section>
    </nav>
  );
};

export default Nav;
