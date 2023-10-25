import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { createProduct } from '../../api/userService'
import { Categories } from '../../helpers/constants'

import "./ProductForm.css";

function ProductForm(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isAdd, setIsAdd] = useState(props.isAdd)
  const [image, setImage] = useState()
  const [isBestSale, setIsBestSale] = useState(isAdd ? false : props.product.isBestSale)
  const [isNew, setIsNew] = useState(isAdd ? true : props.product.isNew)
  const [selectedCategory, setSelectedCategory] = useState(isAdd ? "Chiens" : (props.product.category || "Chiens"))
  const [selectedSubCategory, setSelectedSubCategory] = useState(isAdd ? "Alimentation" : (props.product.subCategory || "Alimentation"))

  const errors = {
    title: "Veuillez insérer le nom du prduit",
    price: "veuillez insérer le prix du produit",
    priceNumber: 'Le prix doit etre un nombre',
    category: 'Veuillez choisir une catégorie',
    subCategory: 'Veuillez choisir une sous-catégorie'
  };

  const handleIsNewChange = (event) => {
    setIsNew(!isNew)
  }

  const handleIsBestSaleChange = (event) => {
    setIsBestSale(!isBestSale)
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value)
  }


  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { title, description, price, fidelityPoints, isNew, isBestSale } = document.forms[0];

    if (!title.value) setErrorMessages({ name: "title", message: errors.title })
    else if (!price.value) setErrorMessages({ name: "price", message: errors.price })
    else if (isNaN(price.value)) setErrorMessages({ name: "price", message: errors.priceNumber })
    else if (!selectedCategory) setErrorMessages({ name: "category", message: errors.category })
    else if (!selectedSubCategory) setErrorMessages({ name: "subCategory", message: errors.subCategory })

    else {

      const dataArray = new FormData()

      dataArray.append("title", title.value)
      dataArray.append("description", description.value)
      dataArray.append("price", price.value)
      dataArray.append("fidelityPoints", fidelityPoints.value)
      if (image) dataArray.append("image", image[0])
      dataArray.append("category", selectedCategory)
      dataArray.append("isNew", isNew.checked)
      dataArray.append("isBestSale", isBestSale.checked)

      await createProduct(dataArray)
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
          <label>Titre :</label>
          <input type="text" name="title" defaultValue={isAdd ? '' : props.product.title} />
          {renderErrorMessage("title")}
        </div>
        <div className="input-container">
          <label>Description : </label>
          <input type="text" name="description" defaultValue={isAdd ? '' : props.product.description} />
          {renderErrorMessage("description")}
        </div>
        <div className="input-container">
          <label>Prix : </label>
          <input type="number" name="price" defaultValue={isAdd ? '' : props.product.price} />
          {renderErrorMessage("price")}
        </div>
        <div className="input-container">
          <label>Points fidélité : </label>
          <input type="number" name="fidelityPoints" defaultValue={isAdd ? '' : props.product.fidelityPoints} />
          {renderErrorMessage("fidelityPoints")}
        </div>
        {isAdd ? <div></div> : <div className="input-container"><img src={props.product.imageUrl} /></div>}
        <div className="input-container">
          <label>Image du produit : </label>
          <input type="file" name="image" onChange={(e) => setImage(e.target.files)} />
          {renderErrorMessage("image")}
        </div>
        <div className="input-container">
          <label>Catégorie : </label>
          <select name="category" id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
            {Object.values(Categories).map( categoryElem => (
              <option value={categoryElem.title}>{categoryElem.title}</option>
            ))}
          </select>
          {renderErrorMessage("category")}
        </div>
        <div className="input-container">
          <label>Sous catégorie : </label>
          <select name="subCategory" id="sub-category-select" value={selectedSubCategory} onChange={handleSubCategoryChange}>
            {Categories[selectedCategory.toLowerCase()].subCategories.map( subCategoryElem => (
              <option value={subCategoryElem}>{subCategoryElem}</option>
            ))}
          </select>
          {renderErrorMessage("subCategory")}
        </div>
        <div>
          <label>nouveau produit : </label>
          <input type="checkbox" id="scales" name="isNew" checked={isNew} onChange={handleIsNewChange}></input>
        </div>
        <div>
          <label>meilleur vente : </label>
          <input type="checkbox" id="scales" name="isBestSale" checked={isBestSale} onChange={handleIsBestSaleChange}></input>
        </div>
        <div className="button-container">
          <input type="submit" value={isAdd ? "ajouter" : "modifier"} />
        </div>
      </form>
    </div>
  );

  return (
    <Container fluid className="center-screen">
      <div className="login-form">
        <div className="button-container"> <img src="/images/logo.png" width="150px" height="auto" /></div>
        <div className="title">{isAdd ? "ajouter" : "modifier"}</div>
        {renderForm}
      </div>
    </Container>
  );
}

export default ProductForm;