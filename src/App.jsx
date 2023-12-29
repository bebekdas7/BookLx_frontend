import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Buyhome from "./components/buy/Buyhome";
import Sellhome from "./components/sell/Sellhome";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AboutPage from "./components/pages/AboutPage";
import Contact from "./components/pages/Contact";
import Signup from "./components/pages/Signup";
import Cart from "./components/pages/Cart";
import Wishlist from "./components/pages/Wishlist";
import Story from "./components/pages/Story";
import College from "./components/pages/College";
import Religious from "./components/pages/Religious";
import History from "./components/pages/History";
import BookBuy from "./components/book-component/BookBuy";
import SellForm from "./components/sell/SellForm";
import Catalogue from "./components/pages/catalogue";
import Checkout from "./components/pages/Checkout";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Buyhome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sell" element={<Sellhome />} />
          <Route path="/saved-books" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/story" element={<Story />} />
          <Route path="/college" element={<College />} />
          <Route path="/history" element={<History />} />
          <Route path="/religious" element={<Religious />} />
          <Route path="/book-info" element={<BookBuy />} />
          <Route path="/upload-book" element={<SellForm />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
