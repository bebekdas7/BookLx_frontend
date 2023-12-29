import { useState, useEffect } from "react";
import "../../styles/checkout.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const Checkout = () => {
  const [name, setName] = useState("");
  const [add, setAdd] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const data = location.state;

  const editedText =
    data && data[0] && data[0].title && data[0].title.length > 20
      ? data[0].title.substring(0, 20) + "..."
      : data[0].title;

  const tax = 200;
  const subTotal = data.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  //Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/braintree/token");
      // console.log(data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const handlePayment = async () => {
    // console.log(instance);
    try {
      setLoading(true);

      // Check if instance is available
      if (!instance) {
        console.error("DropIn instance not available.");
        setLoading(false);
        return;
      }
      const { type } = await instance.requestPaymentMethod();
      console.log(type);
      console.log("hii");
      const { data } = await axios.post(
        "http://localhost:8000/braintree/payment",
        {
          cart: data,
          nonce,
        }
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main className="checkout-fluid container-fluid">
      <main className="checkout container d-flex justify-content-center p-4">
        <section className="checkout-detail pt-4 ps-4 pe-4">
          <div className="d-flex flex-column pb-4">
            <h5 className="inc-sans fw-bold">Contact information</h5>
            <label htmlFor="name" className="varela pt-3">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 p-1"
              placeholder="Enter your name"
              autoComplete="of"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="d-flex flex-column pb-4 pt-4">
            <h5 className="inc-sans fw-bold">Shipping address</h5>
            <label htmlFor="address" className="varela pt-3">
              Address
            </label>
            <input
              type="text"
              className="mt-1 p-1"
              placeholder="St name, area"
              autoComplete="of"
              onChange={(e) => setAdd(e.target.value)}
            />

            <div className="d-flex gap-2 align-items-center pt-3">
              <span className="d-flex flex-column pe-1 ">
                <label htmlFor="city" className="varela">
                  City
                </label>
                <input
                  type="text"
                  className="mt-1 p-1"
                  onChange={(e) => setCity(e.target.value)}
                />
              </span>
              <span className="d-flex flex-column pe-1">
                <label htmlFor="city" className="varela">
                  State/Province
                </label>
                <input
                  type="text"
                  className="mt-1 p-1"
                  onChange={(e) => setState(e.target.value)}
                />
              </span>
              <span className="d-flex flex-column pe-1">
                <label htmlFor="city" className="varela">
                  Postal code
                </label>
                <input
                  type="text"
                  className="mt-1 p-1"
                  onChange={(e) => setZip(e.target.value)}
                />
              </span>
            </div>
          </div>

          <div className="d-flex flex-column align-items-start pb-4 pt-4">
            <h5>Billing information</h5>
            <span>
              <input type="checkbox" className="mt-1 d-inline" />
              <label htmlFor="checkbox" className="varela ps-2">
                Same as shipping information
              </label>
            </span>
          </div>

          <div className="d-flex justify-content-end">
            {clientToken && !instance && (
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
            )}

            <button
              className="btn btn-success"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : "Make Payment"}
            </button>
          </div>
        </section>

        {/* ----------------------------------------/ */}

        <section className="checkout-product h-100 p-4 ">
          {data.length > 0 &&
            data.map((item, i) => (
              <section className="d-flex flex-column justify-content-between h-100">
                <div className="checkout-product-main d-flex justify-content-between p-2 pb-3 mb-2">
                  <span className="checkout-product-span1">
                    <img src={item.src1} alt="Product image" />
                  </span>
                  <span className="checkout-product-span2 w-50 d-flex flex-column justify-content-between ps-1 pe-1">
                    <h6 className="varela">{editedText}</h6>
                    <p className="mb-3">{item.author}</p>
                    <p className="varela">x{item.quantity}</p>
                  </span>
                  <span className="checkout-product-span3 w-25 d-flex flex-column justify-content-start align-items-center varela fw-bold">
                    ₹{item.price}
                  </span>
                </div>

                <div className="checkout-product-footer d-flex flex-column justify-content-around gap-1 p-1">
                  <span className="d-flex justify-content-between">
                    <h6 className="varela fw-bold text-secondary">Sub total</h6>
                    <p className="inc-sans text-secondary">₹{subTotal}</p>
                  </span>
                  <span className="d-flex justify-content-between">
                    <h6 className="varela fw-bold">Total (including GST)</h6>
                    <p className="inc-sans">₹{subTotal + tax}</p>
                  </span>
                </div>
              </section>
            ))}
        </section>
      </main>
    </main>
  );
};

export default Checkout;
