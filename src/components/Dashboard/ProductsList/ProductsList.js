import React, { useState, useEffect } from "react";
import { Container, Button, Col } from "react-bootstrap";
import { getProducts } from "../../../api/userService";
import MaterialTable from 'material-table'
import { AiFillEdit } from 'react-icons/ai'
import swal from 'sweetalert';
import ProductForm from '../../ProductForm/ProductForm'

import "./ProductsList.css";

function ProductsList() {
  // React States
  const [products,setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isAdd, setIsAdd] = useState(false)

  const productClick = (product) => {
    setSelectedProduct(product)
  }

  const backButton = () => {
    setSelectedProduct(null)
    setIsAdd(false)
  }

  const columns = [
    {
      field: 'imageUrl',
      title: 'Image',
      render: item => <img src={item.imageUrl} alt="" border="1" height="50" width="50  " />,
      filtering: false
    },
    {
      field: 'title',
      title: 'Nom',
      filtering: false
    },
    {
      field: 'description',
      title: 'Description',
      filtering: false
    },
    {
      field: 'fidelityPoints',
      title: 'Points fidélité',
      filtering: false
    },
    {
      field:'price',
      title:'Prix',
      render: item => `${item.price} TND`,
      filtering:false
    }
  ]

const handleChangePage = (newPage) => {
  setPage(newPage);
};

const showAddProductForm = () => {
  setIsAdd(true)
}

const handleChangeRowsPerPage = (pageSize) => {
  setRowsPerPage(pageSize);
  setPage(0);
};

const fetchData = async () => {
    const data = await getProducts(undefined, undefined, 'admin')
    if(data.status) setProducts(data.data)
    setLoading(false)
}

  useEffect(()=> {
    fetchData()
  }, [])

  return (
    <Container fluid>
        {
            loading 
                ? <div>Loading</div>
                : selectedProduct 
                  ? <div>
                      <Button className="btn-back" onClick={backButton}>retour au liste des produits</Button>
                      <br></br>
                      <ProductForm isAdd={false} product={selectedProduct}/>
                    </div>
                  : isAdd 
                    ? <div>
                        <Button className="btn-back" onClick={backButton}>retour au liste des produits</Button>
                        <br></br>
                        <ProductForm isAdd={true}/>
                      </div>
                    : <div>
                        <div className="main-screen ">
                          <Button className="btn-create" onClick={showAddProductForm}>Créer un nouveau produit</Button>
                          <MaterialTable
                            title={<h1>Produits</h1>}
                            data={products}
                            columns={columns}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            page={page}
                            totalCount={products.length}
                            localization={{
                              toolbar: {
                                searchPlaceholder: 'Que cherchez-vous?'
                              }
                            }}
                            actions={[
                              {
                                icon: () => <AiFillEdit />,
                                tooltip: 'Editer ce produit',
                                onClick: (event, rowData) => {productClick(rowData)}
                              },
                            ]}
                            options={{
                              actionsColumnIndex: -1,
                              pageSize: rowsPerPage,
                              paginationType: 'stepped',
                              searchFieldVariant: 'outlined',
                              search: true,
                              showTitle: false,
                              toolbar: false,
                              filtering: false,
                              showFirstLastPageButtons: false
                            }}
                          />
                        </div>
                      </div>
                    
        }
    </Container>
  );
}

export default ProductsList;