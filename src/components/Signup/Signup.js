import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { signupAPI } from "../../api/userService";
import swal from 'sweetalert';
import { Container } from "react-bootstrap";

import "./Signup.css";

function Signup({updateAuthStatus}) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gender,setgender]=useState()

  const handlegender=(e)=>{
     setgender(e.target.value)
   }

  useEffect( ()=>{
    localStorage.removeItem("token");
    updateAuthStatus()
    
  }, [])

  const errors = {
    firstname: "Veuillez insérer votre prénom",
    lastname: "Veuillez insérer votre nom",
    email: "Veuillez insérer votre email",
    password: "veuillez insérer votre mot de passe",
    gender: "Veuillez insérer votre sexe",
    dateOfBirth: "Veuillez insérer votre date de naissance",
    phone: "Veuillez insérer votre numéro de téléphone",
    address: "Veuillez insérer votre adresse"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { firstname, lastname, email, password, address, phone, dateOfBirth } = document.forms[0];

    if(!lastname.value) setErrorMessages({ name: "lastname", message: errors.lastname   })
    else if(!firstname.value) setErrorMessages({ name: "firstname", message: errors.firstname })
    else if(!email.value) setErrorMessages({ name: "email", message: errors.email })
    else if(!password.value) setErrorMessages({ name: "password", message: errors.password })
    else if(!phone.value) setErrorMessages({ name: "phone", message: errors.phone })
    else if(!address.value) setErrorMessages({ name: "address", message: errors.address })
    else if(!dateOfBirth.value) setErrorMessages({ name: "dateOfBirth", message: errors.dateOfBirth })
    else if(!gender) setErrorMessages({ name: "gender", message: errors.gender })

    else {
      const newUser = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        dateOfBirth: dateOfBirth.value,
        address: address.value,
        gender
      }

      const data = await signupAPI(newUser)
      if(data.status) {
        swal("Succés", "Votre compte a été crée avec succées !", "success");
      } else {

        swal("Erreur", data.message, "error");
      }

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
          <label>Nom :</label>
          <input type="text" name="lastname" />
          {renderErrorMessage("lastname")}
        </div>
        <div className="input-container">
          <label>Prénom :</label>
          <input type="text" name="firstname" />
          {renderErrorMessage("firstname")}
        </div>
        <div className="input-container">
          <label>Email :</label>
          <input type="text" name="email" />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Mot de passe : </label>
          <input type="password" name="password" />
          {renderErrorMessage("password")}
        </div>
        <div className="input-container">
          <label>Numéro téléphone :</label>
          <input type="text" name="phone" />
          {renderErrorMessage("phone")}
        </div>
        <div className="input-container">
          <label>Adresse :</label>
          <input type="text" name="address" />
          {renderErrorMessage("address")}
        </div>
        <div className="input-container">
          <label>Date de naissance :</label>
          <input type="date" name="dateOfBirth" />
          {renderErrorMessage("dateOfBirth")}
        </div>
        <div>
          <label>Sexe :</label> <br></br>
          <input type="radio" name="gender" value="male" onChange={handlegender} hint="homme"/>
          &nbsp; Homme<br></br>
          <input type="radio" name="gender" value="female" onChange={handlegender} hint="femme"/>
          &nbsp; Femme<br></br>
          {renderErrorMessage("gender")}
        </div>
        <div className="button-container">
          <input type="submit" value={"S'inscrire"}/>
        </div>
      </form>
    </div>
  );

  return (
    <Container fluid className="center-screen">
      <div className="login-form">
        <div className="button-container"> <img src="/images/logo.png" width="150px" height="auto"/></div>
        <div className="title">S'inscrire</div>
        {renderForm}
      </div>
    </Container>
  );
}

export default Signup;