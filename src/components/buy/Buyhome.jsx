import SearchIcon from "@mui/icons-material/Search";
import "../../styles/home.css";
import Buyabout from "./Buyabout";
import Buycat from "./Buycat";
import Features from "./features";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Buyhome = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <main className="home d-flex flex-column flex-lg-row flex-md-column flex-sm-column flex-xs-column">
        <section className="main-left w-100 w-lg-50 p-4 d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1 className="bitter main-left-heading">
              New &<br />
              Trending
            </h1>
            <p className="bitter fs-5 mt-3">Explore new Books everyday</p>
            <div className="search-container d-flex align-items-center gap-1">
              <input
                type="text"
                className="search w-100 ps-2"
                placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className="btn search-btn"
                onClick={() => navigate("/catalogue", { state: searchValue })}
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        </section>

        <section className="main-right w-100 w-lg-50 p-4 d-flex flex-column justify-content-center align-items-center">
          <div className="main-right-inner d-flex justify-content-center align-items-center gap-5">
            <div className="img1">
              <img src="/images/book1.png" alt="" />
            </div>

            <div className="img2">
              <img src="/images/book3.png" alt="" />
            </div>

            <div className="img3">
              <img src="/images/book2.png" alt="" />
            </div>
          </div>
          <p className="bitter mt-4 fs-5 ">Most popular this week</p>
        </section>
      </main>
      <Buyabout />
      <Buycat />
      <Features />
    </>
  );
};

export default Buyhome;
