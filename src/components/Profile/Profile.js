import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getUser, updateUser } from "../../api/userService";
import swal from 'sweetalert';
import { Container } from "react-bootstrap";

import "./Profile.css";

function Profile({updateAuthStatus}) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)


  const fetchData = async () => {
    const userId = await localStorage.getItem("userId")
    if(!userId) swal("Erreur", "Vous devez vous connecter pour consulter votre profile", "error");
    const data = await getUser(userId) 
    if(data.status) {
        setUser(data.data)
        setLoading(false)
    }
    else swal("Erreur", "une erreur s'est produite", "error");
  }

  useEffect(()=> {
    fetchData()
  }, [])

  const errors = {
    email: "Veuillez insérer votre email",
    password: "veuillez insérer votre mot de passe",
    phone: "Veuillez insérer votre numéro de téléphone",
    address: "Veuillez insérer votre adresse"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, password, address, phone } = document.forms[0];

    if(!email.value) setErrorMessages({ name: "email", message: errors.email })
    else if(!password.value) setErrorMessages({ name: "password", message: errors.password })
    else if(!phone.value) setErrorMessages({ name: "phone", message: errors.phone })
    else if(!address.value) setErrorMessages({ name: "address", message: errors.address })

    else {
      const newUser = {
        email: email.value,
        phone: phone.value,
        address: address.value
      }

      if (password.value) newUser.password = password.value

      const data = await updateUser(user._id, newUser)
      if(data.status) swal("Succés", "Votre profile a été mis à jour !", "success");
      else swal("Erreur", data.message, "error");

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
          <input type="text" name="lastname" value={user.lastname || ''} disabled/>
          {renderErrorMessage("lastname")}
        </div>
        <div className="input-container">
          <label>Prénom :</label>
          <input type="text" name="firstname" value={user.firstname || ''} disabled/>
          {renderErrorMessage("firstname")}
        </div>
        <div className="input-container">
          <label>Email :</label>
          <input type="text" name="email" defaultValue ={user.email || ''} />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Mot de passe : </label>
          <input type="password" name="password"/>
          {renderErrorMessage("password")}
        </div>
        <div className="input-container">
          <label>Numéro téléphone :</label>
          <input type="text" name="phone" defaultValue ={user.phone || ''}/>
          {renderErrorMessage("phone")}
        </div>
        <div className="input-container">
          <label>Adresse :</label>
          <input type="text" name="address" defaultValue ={user.address || ''}/>
          {renderErrorMessage("address")}
        </div>
        <div className="input-container">
          <label>Date de naissance :</label>
          <input type="date" name="dateOfBirth" value={user.dateOfBirth || ''}disabled/>
          {renderErrorMessage("dateOfBirth")}
        </div>
        <div className="button-container">
          <input type="submit" value={"Confirmer"}/>
        </div>
      </form>
    </div>
  );

  return (
    <Container fluid className="center-screen">
        { loading 
            ? <img src="/images/loading.gif" width="500px" height="auto"/> 
            : <div className="login-form">
                <div className="button-container"> <img src="/images/logo.png" width="150px" height="auto"/></div>
                <div className="title">Profile</div>
                {renderForm}
              </div>
        }
    </Container>
  );
}

export default Profile;