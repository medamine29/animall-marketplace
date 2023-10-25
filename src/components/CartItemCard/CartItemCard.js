import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Col, Row } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import { QuantityPicker } from 'react-qty-picker';
import { AiFillCloseCircle } from 'react-icons/ai'

import './CartItemCard.css'

function CartItemCard({ product, removeProductFromCart, updateCartProductQuantity }) {

  const getQuantityPickerValue = (value) =>{
    updateCartProductQuantity(product._id, value)
  }

  return (
    <Container fluid className="cart-item-container">
        <Paper className="cart-item">
            <Row>
              <Col xs={4} sm={4} lg={4}><img src={product.imageUrl} width="150px !important" height="150px" style={{ padding: "3 px", objectFit: "contain !important" }} alt={product.title || "image"}/></Col>
              <Col  style={{ marginLeft: "30px"}}>
                <Row>
                  <Col xs={10} sm={10} lg={10}><h5>{product.title}</h5></Col>
                  <Col xs={2} sm={2} lg={2}>
                    <div className="close-button" onClick={() => removeProductFromCart(product._id)}><AiFillCloseCircle size={20} color="#971919" /></div>
                  </Col>
                </Row>
                <QuantityPicker min={1} value={product.quantity || 1} onChange={getQuantityPickerValue} smooth/>
                <div style={{height: "20px"}}></div>
                <h6 className="red-text"><strong>{product.price * ( product.quantity || 1)} TND</strong></h6>
              </Col>
            </Row>
        </Paper>
    </Container>
  );
}

export default CartItemCard;
