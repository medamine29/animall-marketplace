import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

import './ProductCard.css'

function ProductCard({ product, addProductToCart }) {
  return (
    <Container fluid>
      <Card sx={{ maxWidth: 345 }} className="m20">
        <CardMedia
          component="img"
          alt={product.title}
          height="200"
          image={product.imageUrl}
          style={{ padding: "0.5 em", objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" className="red">
            <strong>{product.price} DT</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ height: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {product.description} 
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small" className="yellow" onClick={() => addProductToCart(product)}>Ajouter au panier</Button>
        </CardActions> */}
        <button className="btn-add" onClick={() => addProductToCart(product)}>Ajouter au panier</button>
      </Card>
    </Container>
  );
}

export default ProductCard;
