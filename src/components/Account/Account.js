import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Col } from "react-bootstrap";
import Login from '../Login/login'
import Signup from '../Signup/Signup'

import "./Account.css";

function Account({updateAuthStatus, setIsAdmin}) {
  // React States
  const [isLogin,setIsLogin] = useState(true)

  const handleIsLogin = () => {
    setIsLogin(!isLogin)
  }

  return (
    <Container fluid className="center-screen">
        { isLogin 
            ? <Login updateAuthStatus={updateAuthStatus} setIsAdmin={setIsAdmin} />
            : <Signup updateAuthStatus={updateAuthStatus} />
        }
                { isLogin
            ? <button className="btnIsLogin" onClick={handleIsLogin}>Vous n'avez pas de compte ? inscrivez-vous</button>
            : <button className="btnIsLogin" onClick={handleIsLogin}>Vous avez déja un compte ? connectez-vous</button>
        }


    </Container>
  );
}

export default Account;