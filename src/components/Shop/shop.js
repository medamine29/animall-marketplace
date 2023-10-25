import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation } from 'react-router-dom'
import { Container, Button, Col } from "react-bootstrap";
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { getProducts } from "../../api/userService";
import ProductCard from '../ProductCard/ProductCard'
import { useParams } from 'react-router-dom';

function Shop({addProductToCart}) {
  // React States
  const [products,setProducts] = useState([])
  const { category, subCategory } = useParams();

const fetchData = async () => {
    const data = await getProducts(category, subCategory)
    if(data.status) setProducts(data.data)
}

  useEffect(()=> {
    fetchData()
  }, [category, subCategory])

  return (
    <Container fluid>
        <Grid container>
            {
                products.map( prod => (
                    <Grid item key={prod._id} xs={12} sm={4} lg={3}>
                        <ProductCard product={prod} addProductToCart={addProductToCart}/>
                    </Grid>
                ))
            }
        </Grid>
    </Container>
  );
}

export default Shop;