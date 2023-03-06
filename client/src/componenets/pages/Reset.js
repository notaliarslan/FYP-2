
import './App.css';
import res from '../images/reset.png';
import pin from '../images/pin.png';
import arrow from '../images/arrow.png'
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import Navbar from './Navbar';
function Reset() {
  const navigate = useNavigate();
    const [password, setPass] = useState('');
    const [Cpassword, setCPass] = useState('');

    const [errP, seterrP] = useState(false)
    const [errCP, seterrCP] = useState(false)

 const[err,seterr]=useState('');
  const update = () => {
    var email1=window.localStorage.getItem("email");
  
    if(password.length < 8)
    {
     seterrP(true)
    }
    else if(password != Cpassword)
    {
      seterrCP(true)
    }
    else
    {
      seterrP(false)
      seterrCP(false)
    Axios.put("http://localhost:3006/update", {
        email:email1,
        password:password,
    }).then((response) => {
       console.log("Password Updated Succesfully");
       navigate('/login')
        console.log(response);
    })
  }
};

const passHandler = (e) => {

  setPass(e.target.value)
  if (e.target.value.length<8 ) {
    seterrP(true)
  }
  else {
    seterrP(false)
  }
}


const CpassHandler = (e) => {

  setCPass(e.target.value)
  if (e.target.value === "") {
    seterrCP(true)
  }
  else if (password !== e.target.value) {
    seterrCP(true)
  }
  else {
    seterrCP(false)
  }


}



  const handleSubmit = (e) => {
    e.preventDefault();
  
}
  useEffect(() => {
    if(localStorage.getItem('email_token'))
    {
      navigate('/home')
    }
  }, [])
  return (
    <div>
      <Navbar/>
    
  <section className="reset">
  <div className="conatiner mt-5">
    <div className="reset-content">
      <div className="signin-form">
      <a href="/forgotpassword">
                    <img className="resetbackarrow-icon" src={arrow} alt=""></img>
                  </a>
        <img class="reset-icon" src={res}></img>
        <h2 className="form-title">Reset Password</h2>
        <form
          className="register-form"
          id="register-form"
          onSubmit={handleSubmit}
          >
       <div className="form-group">
                <label htmlFor="password">
                  <img className="pass-icon" src={pin}></img>
                </label>
                <input
                  type="pin"
                  name="pin"
                  id="pin"
                  placeholder="New Password"
                  value={password} 
                  onChange={passHandler}
                  autoComplete="off"
                ></input>
              </div>
              {
                errP ? <span style={{ color: "red" }}>Password Must be grater than 8 character</span> : ""
              }
          <div className="form-group">
                <label htmlFor="password">
                <img className="pass-icon" src={pin}></img>
                </label>
                <input
                  type="pin"
                  name="pin"
                  id="pin"
                  placeholder="Confirm Password"
                  value={Cpassword} 
                  onChange={CpassHandler}
                  autoComplete="off"
                ></input>
              
              </div>
              {
                errCP ? <span style={{ color: "red" }}>Password Desn't Match</span> : ""
              }
       <div> <button  id="btn_F"  onClick={update}>Update</button></div>
             
        
        
        </form>
        
      </div>
    </div>
  </div>
</section>
</div>
  );
}
export default Reset;