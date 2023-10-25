import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Col } from "react-bootstrap";
import Grid from '@material-ui/core/Grid'
import ProductCard from '../ProductCard/ProductCard'
import CartItemCard from '../CartItemCard/CartItemCard'
import swal from 'sweetalert';
import { checkoutOrder } from "../../api/userService";
import { useNavigate } from "react-router-dom"

import './cart.css'

function Cart({products, removeProductFromCart, updateCartProductQuantity}) {

    const [fidelityUsed,setFidelityUsed] = useState(0)

    const navigate = useNavigate();

  const handleFidelityChange = (event) => {
    setFidelityUsed(event.target.value)
  }

  const confirmOrder = async () => {
    const token = await localStorage.getItem('token')
    if(!token) {
        //swal("Erreur", "Vous devez vous connecter pour passer une commande", "error",);

        swal({
            title: "Erreur",
            text: "Vous devez vous connecter pour passer une commande",
            icon: "error",
            buttons: {
                login: "Se connecter"
            }
        }).then((value) => {
            if (value === 'login') navigate("/account")
        })
        return
    }

    const ownedFidelityPoints = localStorage.getItem('fidelityPoints')

    if (fidelityUsed > ownedFidelityPoints) {
        swal("Erreur", `Vous ne pouvez pas utilisé plus que ${ownedFidelityPoints} points fidélité`, "error")
        return
    }

    const updatedProducts = products.map( prodElem => {
        prodElem.productId = prodElem._id
        return prodElem
    })

    const order = {
        userId: localStorage.getItem('userId'),
        orderPricing: {},
        products: updatedProducts,
        deliveryAddress: localStorage.getItem('address'),
    }

    let totalCost = 0
    products.map( prod => {
        totalCost += prod.price * ( prod.quantity || 1 )
    })
    
    const reduction = +(fidelityUsed / 10).toFixed(2)

    const pricing = {
        finalAmount: totalCost - reduction,
        reductionAmount: reduction,
        baseAmount: totalCost
    }
    order.orderPricing = pricing

    const data = await checkoutOrder(order)
    if(data.status) swal("Succés", "Votre commandé a été ajouté avec succés !", "success");
    else swal("Erreur", data.message, "error");

  }

  return (
    <div className="wrapper">
    <Container fluid className="main-container-cart">
        <Grid container>
            {
                products.map( prod => (
                    <Grid item key={prod._id} xs={12} sm={12} lg={12} style={{width: "50% !important"}}>
                        <CartItemCard product={prod} removeProductFromCart={removeProductFromCart} updateCartProductQuantity={updateCartProductQuantity} />
                    </Grid>
                ))
            }
        </Grid>
        <div className="main-container-cart">
            <button className="btn-order m-top-10" onClick={confirmOrder}>Confirmer la commande</button>
        </div>

    </Container>
    </div>
  );
}

export default Cart;