import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Row, Col, Button, Container } from "react-bootstrap";
import Contact from '../Contact/Contact'
import { getProductsByFilter } from "../../api/userService";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

import "./HomePage.css";

function HomePage({ elementId, addProductToCart }) {

    const [bestSaleProducts, setBestSaleProducts] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [showCarousel, setShowCarousel] = useState(false)

    const fetchData = async () => {

        const bestSaledata = await getProductsByFilter("best")
        if (bestSaledata.status) setBestSaleProducts(bestSaledata.data)

        await getProductsByFilter("new").then( (newProductsData) => {
            if (newProductsData.status) setNewProducts(newProductsData.data)
            setShowCarousel(true)
        })

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="homePage">

            <Container className="meilleursVentes">
                <Carousel id="carousel" autoPlay="true" autoFocus="true" infiniteLoop="true" interval="1800" ariaLabel="meilleurs ventes">
                    {bestSaleProducts.map(product => (
                        <div> <img src={product.imageUrl} /> </div>
                    ))}
                </Carousel>
            </Container>

            {
                showCarousel
                    ? <ProductCarousel items={newProducts} addProductToCart={addProductToCart}/>
                    : <div></div>
            }

            <Container id="contactUs" className="contactUs">
                <div className="socials shadow-5"><Contact /></div>
            </Container>


        </div>
    )

}

export default HomePage