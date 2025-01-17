import React from "react";
import "../pages/App.css";
import { NavLink } from "react-router-dom";
import upd from '../images/updated.png';


function Pac_Updated() {
  return (
  <section className="Forgot">
  <div className="conatiner mt-5">
    <div className="Forgot-content">
      <div className="signin-form">
        <h2 className="form-title">Password Updated</h2>
        <form
          className="register-form"
          id="register-form"
          >
      <img className="updated-pg" src={upd}></img>
          <p className="txt"> Your Password Has Been Updated!</p>
          
          <div className="signin-image">
            <button className="updated">
            <NavLink to="/login" className="signup-image-link">
                Login
              </NavLink>
        
            </button>
            </div>
        </form>
        
      </div>
    </div>
  </div>
</section>
  );
}
export default Pac_Updated;