import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { loginAPI } from "../../api/userService";
import swal from 'sweetalert';
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

import "./Login.css";

function Login({updateAuthStatus, setIsAdmin}) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  
  const navigate = useNavigate();

  useEffect( ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    updateAuthStatus()
    
  }, [])

  const errors = {
    uname: "Veuillez insérer votre email",
    pass: "veuillez insérer votre mot de passe"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    if(!uname.value) {
      setErrorMessages({ name: "uname", message: errors.uname });
    }

    else if(!pass.value) {
      setErrorMessages({ name: "pass", message: errors.pass });
    }

    else {
      const data = await loginAPI(uname.value, pass.value)
      if(data.status) {
        if(data.data.role === 'admin') setIsAdmin(true)
        navigate("/");
      }
      else swal("Erreur", data.message, "error");
      
      updateAuthStatus()
    }
  

  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email :</label>
          <input type="text" name="uname" />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Mot de passe : </label>
          <input type="password" name="pass" />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value={"Se Connecter"}/>
        </div>
      </form>
    </div>
  );

  return (
    <Container fluid className="center-screen">
      <div className="login-form">
        <div className="button-container"> <img src="/images/logo.png" width="150px" height="auto"/></div>
        <div className="title">Se connecter</div>
        {renderForm}
      </div>
    </Container>
  );
}

export default Login;