import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import ProductCard from '../ProductCard/ProductCard';

function ProductCarousel({ items, addProductToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [goRight, setGoRight] = useState(true);

  useEffect(() => {
    
    const interval = setInterval(() => {

        if (goRight) {
            if (currentIndex + 6 <= items.length) setCurrentIndex(currentIndex + 1)
            else {
                setGoRight(false)
                setCurrentIndex(currentIndex - 1)
            }
        } else {
            if (currentIndex - 1 >= 0) setCurrentIndex(currentIndex - 1)
            else {
                setGoRight(true)
                setCurrentIndex(currentIndex + 1)
            }
        }

        if (goRight) handleNext()
        else handlePrevious()

    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, items.length]);

  const handlePrevious = () => {
    if (currentIndex - 1 >= 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex + 6 <= items.length) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', width: `${items.length * 20}%`, transform: `translateX(-${currentIndex * (100 / items.length)}%)` }}>
        {items.map(item => (
          <div key={item.id} style={{ width: `${100 / items.length}%` }}>
            <ProductCard product={item} addProductToCart={addProductToCart}/>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <IconButton onClick={handlePrevious}>
          <AiOutlineArrowLeft />
        </IconButton>
        <IconButton onClick={handleNext}>
          <AiOutlineArrowRight />
        </IconButton>
      </div>
    </div>
  );
}

export default ProductCarousel;
