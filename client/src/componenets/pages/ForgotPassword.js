import "./App.css";
import forg from "../images/forgot1.png";
import ema from "../images/email1.png";
import pin from "../images/pin1.png";
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import emailjs from "@emailjs/browser";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import arrow from "../images/arrow1.png";
import "@fontsource/montserrat";
import imag2 from '../images/login4.png';
function ForgotPassword() {

  const form = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
  const [err, seterr] = useState("");


  const [checkemail, setcheckE] = useState(false)
  const [checkotp, setcheckotp] = useState(false)


  const otpgenerator = () => {
    var arr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var ans = "";
    for (var i = 0; i < 6; i++) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    //console.log(ans);
    return ans;
  };

  const [otp_generated, setotp_generated] = useState(otpgenerator());

  const emailHandle = (e) => {
    setEmail(e.target.value);
    setotp_generated(otpgenerator());

  };

  const sendEmail = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3006/forget", {
      email: email,
    }).then((response) => {
      if (response.data === "user found" && email != "") {
        console.log("sending");
        console.log(otp_generated);
        emailjs.sendForm(
          "service_5oubeuc",
          "template_3lgmcmn",
          form.current,
          "g-C1asTIT73OcGBU9"
        ).then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
        setcheckE(false)
      }
      else {
        console.log("not")
        setcheckE(true);
      }
    })
  }


  const verify = () => {

    if (otp === otp_generated) {
      setotp_generated(otpgenerator());
      console.log("change password");
      window.localStorage.setItem("email", email);
      navigate("/reset");
      setcheckotp(false)
    } else {
      console.log("Incorrect Otp");
      setcheckotp(true)
    }


  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (localStorage.getItem('email_token')) {
      navigate('/home')
    }
  }, [])
  return (
    <div>
      <div>
        <Navbar />
        <div className='Forget-banner'>
          <div className="overlaybg2">
            <img className="img1" src={imag2}></img>
            <div className='ContentLanding'>
            <section className="Forgot">
              <div className="conatiner mt-5">
                <div className="Forgot-content">
                  <div className="forgot-form">

                  <form
                      ref={form}
                      className="forgotf"
                      id="register-form"
                      onSubmit={handleSubmit}
                    >
                    <a href="/login">
                      <img className="backarrow-icon" src={arrow} alt=""></img>
                    </a>
                    <img className="forgot-icon" src={forg}></img>

                    <h2 className="form-title">Forgot Password</h2>
                    
                      <div className="forgot-email">
                        <label htmlFor="email">
                          <img className="pass-icon" src={ema}></img>
                        </label>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color:"#ffffff" }}
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          onChange={emailHandle}
                          value={email}

                        ></input>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color:"#ffffff" }}
                          type="hidden"
                          name="otpg"
                          id="otpg"

                          value={otp_generated}

                        ></input>

                        <button class="OTP-btn" onClick={sendEmail}>Get OTP</button>
                      </div>
                      {
                        checkemail ? <span style={{ color: "#00ffff", marginRight: "65px" }}>Email Not Found</span> : ""
                      }
                      <p>{err}</p>
                      <div className="form-group">
                        <label htmlFor="password">
                          <img className="pass-icon" src={pin}></img>
                        </label>
                        <input
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color:"#ffffff" }}
                          type="pin"
                          name="pin"
                          id="pin"
                          placeholder="Confirmation Pin"
                          value={otp}
                          onChange={(e) => setotp(e.target.value)}
                          autoComplete="off"
                        ></input>
                      </div>
                      {
                        checkotp ? <span style={{ color: "#00ffff", marginRight: "65px" }}>Invalid OTP</span> : ""
                      }
                      <input
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", border: "2px solid #ffffff", color:"#ffffff" }}
                        type="hidden"
                        name="generatedOtp"
                        defaultValue={otp_generated}
                      />

                      <div>

                        <button id="F-btn" onClick={verify}>
                          Verify
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
