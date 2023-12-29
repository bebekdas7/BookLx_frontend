import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [change, setChange] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const handleSignin = () => {
    setChange(false);
  };
  const handleSignup = () => {
    setChange(true);
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      const result = await axios.post("http://localhost:8000/signup", {
        name,
        email,
        password,
      });
      console.log(result);
      if (result.data.success === true) {
        toast.success("Account created Please SignIn");
        setChange(false);
        setEmail("");
        setPassword("");
        setCpassword("");
      } else if (result.data.success === false) {
        toast.error("Account Exists Please SignIn");
      }
    } else {
      toast.error("Password and Confirm Password not matched");
    }
  };

  const handleSubmitSignin = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/signin", {
      signinEmail,
      signinPassword,
    });
    console.log(result);

    if (result.data.success === true) {
      toast.success("Signed In Successfully");
      localStorage.setItem("userId", result.data.check[0]._id);
      navigate("/");
      window.location.href = "";
    } else if (result.data.success == "wrong") {
      toast.error("Email or Password do not patch");
    } else if (result.data.success === false) {
      toast.error("Please Sign Up");
    }
  };

  return (
    <main className="user">
      {change == true ? (
        <section className="signup d-flex">
          <section className="signup-design d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-white">Welcome Back</h1>
            <p className="text-white text-center mt-2">
              To keep connected with us please
              <br /> Login with your credentials info
            </p>
            <button
              className="mt-4 text-white fw-semibold"
              onClick={handleSignin}
            >
              Sign In
            </button>
          </section>
          <section className="signup-form d-flex flex-column justify-content-center align-items-center">
            <h1 className="varela fw-semibold mb-4">Create Account</h1>
            <form
              className="w-100 d-flex flex-column justify-content-center align-items-center"
              onSubmit={handleSubmitSignup}
            >
              <input
                type="text"
                className="varela"
                name="name"
                placeholder="Name.."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
              <input
                type="email"
                className="varela"
                name="email"
                placeholder="Email.."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="on"
              />
              <input
                type="password"
                className="varela"
                name="password"
                placeholder="Password.."
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              />
              <input
                type="password"
                className="varela"
                name="cpassword"
                placeholder="Confirm Password.."
                required
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                autoComplete="on"
              />
              <button type="submit" className="text-white varela">
                Sign Up
              </button>
            </form>
          </section>
        </section>
      ) : (
        <section className="signin d-flex">
          <section className="signin-form d-flex flex-column justify-content-center align-items-center">
            <h1 className="varela fw-semibold mb-4">Sign in to BookLx</h1>
            <form
              className="w-100 d-flex flex-column justify-content-center align-items-center"
              onSubmit={handleSubmitSignin}
            >
              <input
                type="email"
                className="varela"
                name="email"
                placeholder="Email.."
                required
                value={signinEmail}
                onChange={(e) => setSigninEmail(e.target.value)}
                autoComplete="on"
              />
              <input
                type="password"
                className="varela"
                name="password"
                placeholder="Password.."
                required
                value={signinPassword}
                onChange={(e) => setSigninPassword(e.target.value)}
                autoComplete="on"
              />
              <button className="text-white varela">Sign In</button>
            </form>
          </section>
          <section className="signin-design d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-white">Hello, Friend</h1>
            <p className="text-white text-center mt-2">
              Enter your Personal details
              <br /> and start Journey with us
            </p>
            <button
              className="mt-4 text-white fw-semibold"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </section>
        </section>
      )}

      {/* -------------------------------------------------------------- */}
    </main>
  );
};

export default Signup;
