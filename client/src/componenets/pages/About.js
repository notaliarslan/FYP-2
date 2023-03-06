import {React, useEffect} from "react";
import './App.css';
import { NavLink, useNavigate } from "react-router-dom";
import upd from '../images/updated.png';
import Navbar from './NavbarHome';
import arrow from '../images/arrow.png'
function AboutUs() {
  const navigate=useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('email_token'))
    {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <Navbar/>
    
  <section className="About">
  <div className="conatiner mt-5">
    <div className="about-form">
    
      <div className="signin-form">
      <a >
                    <img className="aboutbackarrow-icon" src={arrow} alt=""></img>
                </a>
        <h2 className="form-title">About Us</h2>
        <form
          className=""
          id="about-form"
          >
<br></br>
          <p className="txt">Welcome to Gamingstan, the premier peer-to-peer gaming marketplace,<br></br>
           and e-commerce store.

At Gamingstan, we are passionate about gaming and understand the <br></br>
value of a great gaming experience. That's why we've created a  platform for gamers to<br></br>

buy, sell, and trade their favorite game accounts
and hardware.<br></br>
Our integrated e-commerce store allows users to 
safely and securely purchase<br></br> brand-new hardware.<br></br>
<br></br>
Our team is dedicated to providing an easy and
enjoyable experience for all of our users.<br></br>
We prioritize safety and security on our platform and have a dedicated support<br></br>
 team available to assist with any questions or issues.<br></br>
<br></br>

Thank you for choosing Gamingstan. We look
forward to helping you find the perfect <br></br>
game account or hardware for your needs.</p>
          
          
        </form>
        
      </div>
    </div>
  </div>
</section>
</div>
  );
}
export default AboutUs;