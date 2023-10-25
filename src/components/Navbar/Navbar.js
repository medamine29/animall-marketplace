import React, { useState, useEffect } from "react";
import Login from '../Login/login'
import Account from '../Account/Account'
import HomePage from '../HomePage/HomePage'
import Offres from "../Offres/Offres";
import Cart from '../Cart/cart'
import Shop from '../Shop/shop'
import Profile from '../Profile/Profile'
import Blog from '../Blog/Blog'
import ProductsList from "../Dashboard/ProductsList/ProductsList";
import OrdersList from "../Dashboard/OrdersList/OrdersList";
import { FaShoppingCart } from 'react-icons/fa'
import { BsFillFilePersonFill } from 'react-icons/bs'
import swal from 'sweetalert';
import { Categories } from '../../helpers/constants'
import { Grid, Paper } from '@material-ui/core'
import { Row, Col, Button, Container } from "react-bootstrap";
import { getOffre } from '../../api/userService'
import MovingText from 'react-moving-text'
import { Badge } from "@material-ui/core"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import "./Navbar.css";

export default function NavBar() {


  const [authStatus, setAuthStatus] = useState('Se connecter');
  const [cartProducts, setCartProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(Categories.chats);
  const [promotionText, setPromotionText] = useState('');
  const [badgeCounter, setBadgeCounter] = useState(0);

  async function updateAuthStatus() {
    const token = await localStorage.getItem('token')
    const role = await localStorage.getItem('role')
    if (!role) setIsAdmin(false)
    if (!token) setAuthStatus('Se connecter')
    else setAuthStatus('Se déconnecter')
  }

  function updateCartProductQuantity(productId, quantity) {
    const newProds = [...cartProducts]
    newProds.map(el => {
      if (el._id == productId) el.quantity = quantity
    })
    setCartProducts(newProds)
  }

  function addProductToCart(product) {

    const itemIndex = cartProducts.findIndex( prodElem => prodElem._id === product._id)

    if (itemIndex == -1) {
      setCartProducts([...cartProducts, product]) 
      swal("Succés", "Produit ajouté au panier !", "success");
      setBadgeCounter(badgeCounter + 1)
    } else swal("Notice", "ce produit est déja au panier !", "warning");
  }

  function showSubCategoriesEventHandler(category) {
    setSelectedSubCategory(Categories[category || "chats"])
    setShowSubCategories(true)
  }

  function unShowSubCategoriesEventHandler() {
    setShowSubCategories(false)
  }

  function removeProductFromCart(productId) {
    const index = cartProducts.findIndex(el => el._id == productId)
    //const newProds = cartProducts.filter((prodElem) => prodElem._id != productId)
    const newProds = [...cartProducts]
    newProds.splice(index, 1);
    setCartProducts(newProds)
    setBadgeCounter(badgeCounter - 1)
  }

  const setUpOffreText = async () => {
    const data = await getOffre()
    if (data.status) setPromotionText(data.data)
  }

  useEffect(() => {
    setUpOffreText()
    updateAuthStatus()
  }, [])


  return (
    <Router>
      <div className="navBg">
        <Container fluid className="promoHeader">
            <MovingText
      type="jelly"
      duration="3000ms"
      delay="2s"
      direction="normal"
      timing="ease-in-out"
      iteration="infinite"
      fillMode="none">
      {promotionText}
    </MovingText>
        </Container>
        <div id="full-navBar" onMouseLeave={unShowSubCategoriesEventHandler}>
          <div id="menuNavbar">
            <ul className="liste">
              <li className="logo"><Link to="/"><img src="/images/logo.png" width="70px" height="55px" marginRight="200px" /></Link></li>
              <li className="items"><div className="linkNavBar" onMouseEnter={(event) => showSubCategoriesEventHandler("chiens")}>Chiens</div></li>
              <li className="items"><div className="linkNavBar" onMouseEnter={(event) => showSubCategoriesEventHandler("chats")}>Chats</div></li>
              <li className="items"><div className="linkNavBar" onMouseEnter={(event) => showSubCategoriesEventHandler("oiseaux")}>Oiseaux</div></li>
              <li className="items"><div className="linkNavBar" onMouseEnter={(event) => showSubCategoriesEventHandler("rongeurs")}>Rongeurs</div></li>
              <li className="items"><div className="linkNavBar" onMouseEnter={(event) => showSubCategoriesEventHandler("poissons")}>Poissons</div></li>
              <li className="items"><Link to="/blog" className="linkNavBar">blog</Link></li>
              {/* <li className="items">FAQ</li> */}
              <Link to="/account" className="linkNavBar"><button className="btnLog">{authStatus}</button></Link>
              <Link to="/profile" className="linkNavBar"><BsFillFilePersonFill className="iconNav" style={{ display: authStatus != 'Se connecter' ? "block" : "none" }} /></Link>
              <Link to="/cart" className="linkNavBar"><Badge badgeContent={badgeCounter} color="secondary">
        <FaShoppingCart color="action" />
          </Badge></Link>
            </ul>
          </div>
          <div className="subCategories" style={{ display: showSubCategories ? "block" : "none" }}>
            <Grid container justifyContent="center" alignItems="center" direction="row">
              {selectedSubCategory && selectedSubCategory.subCategories.map(subCatElem => (
                <Grid item key={subCatElem} xs={12} sm={5} lg={3}>
                  <Link 
                    to = {`/shop/${selectedSubCategory.title}/${subCatElem}`}
                    className="linkNavBar">
                      <h6>{subCatElem}</h6></Link>
                </Grid>
              ))
              }
            </Grid>
          </div>
        </div>
        <div id="dashboardNavbar" style={{ display: localStorage.getItem('role') === 'admin' ? "block" : "none" }}>
          <ul className="liste-admin">
            <li className="items"><Link to="/productsList" className="linkNavBar">Produits</Link></li>
            <li className="items"><Link to="/ordersList" className="linkNavBar">Commandes</Link></li>
            <li className="items"><Link to="/offres" className="linkNavBar">Offres</Link></li>
          </ul>
        </div>
        <div id="content">
          <Routes >
          <Route path='/offres' element={<Offres />} />
            <Route path='/ordersList' element={<OrdersList />} />
            <Route path='/productsList' element={<ProductsList />} />
            <Route path='/' element={<HomePage elementId="carousel" addProductToCart={addProductToCart} />} />
            <Route path='/aboutUs' element={<HomePage elementId="aboutUs" />} />
            <Route path='/contactUs' element={<HomePage elementId="contactUs" />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/shop/:category/:subCategory' element={<Shop addProductToCart={addProductToCart} />} />
            <Route path='/cart' element={<Cart products={cartProducts} removeProductFromCart={removeProductFromCart} updateCartProductQuantity={updateCartProductQuantity} />} />
            <Route path='/account' element={<Account updateAuthStatus={updateAuthStatus} setIsAdmin={setIsAdmin} />} />
          </Routes >
        </div>
      </div>
    </Router>


  );
}
