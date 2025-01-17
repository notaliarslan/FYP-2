import React, { useState, useEffect } from "react";
import Axios from "axios";
import NavbarD from "./NavbarD";
import { Navigate, useNavigate } from "react-router-dom";
import imag2 from "../images/login10.jpg";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(1);
  var quant = 1;
  const navigate = useNavigate();
  var email = localStorage.getItem("email");
  useEffect(() => {
    Axios.get(`http://localhost:3006/Get_items`).then((response) => {
      console.log("THis is Response Data : ", response.data);
      var temp = response.data;
      console.log(response.data);
      temp.forEach((element) => {
        element.Images = JSON.parse(element.Images);
        element.Sum = element.Sum + element.Total;
      });
      setCart(temp);
      console.log("After parse : ", temp.Sum);
    });
  }, []);

  console.log("THis is carty ", cart);
  const updateCart = (id, quantity, price) => {
    Axios.put(`http://localhost:3006/UpdateCart/${id}`, {
      Quantity: quantity,
      Price: price,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(`http://localhost:3006/Get_items`).then((response) => {
      console.log("THis is Response Data : ", response.data);
      var temp = response.data;
      console.log(response.data);
      temp.forEach((element) => {
        element.Images = JSON.parse(element.Images);
      });
      setCart(temp);
      console.log("After parse : ", temp);
    });
  };

  const removeFromCart = (id) => {
    console.log(id);
    Axios.delete(`http://localhost:3006/RemoveCart/${id}`)
      .then((res) => {
        setCart(
          cart.filter((val) => {
            return val.ProductId != id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const total = cart.reduce((acc, item) => {
    return acc + item.Total;
  }, 0);

  const GoProceed = () => {
    localStorage.setItem("TotalBill", total);
    localStorage.setItem("cart",1)
    localStorage.setItem('PackageType',"")
    navigate("/payment");
  };

  console.log("TRIS  tos:lb : ", total);
  return (
    <div>
      <NavbarD />
      <div className="sell-banner">
        <div className="overlaybg0"></div>
        <img className="img1" src={imag2}></img>
        <div className="ContentLanding">
          <div className="cart-container">
            <div
              style={{ textAlign: "center", color: "#fff", marginTop: "50px" }}
            >
              <h1>
                <b>My Cart</b>
              </h1>
            </div>
            <div className="items-container">
              {cart.map((item) => (
                <div className="item" key={item.id}>
                  <img src={item.Images[0]} alt={item.ProductName} />
                  <div className="item-details">
                    <p className="item-name">{item.ProductName}</p>
                    <p className="item-price">{item.Total}</p>
                    <div className="quantity-container">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateCart(
                            item.ProductId,
                            (item.Quantity -= 1),
                            (item.Total -= item.Price)
                          )
                        }
                      >
                        -
                      </button>
                      <span className="item-quantity">{item.Quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateCart(
                            item.ProductId,
                            (item.Quantity += 1),
                            (item.Total += item.Price)
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.ProductId)}
                    >
                      Remove
                    </button>
                    <br></br>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", color: "#fff", marginTop: 60 }}>
              <h2>Total Bill: {total}</h2>
            </div>
            <div className="button-container">
            
              
              <button className="BuyNowstore" onClick={GoProceed}>
                Buy Now
              </button>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
