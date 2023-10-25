import React, { useState, useEffect } from "react";
import { Container, Button, Col } from "react-bootstrap";
import { getOrders, updateOrderStatus } from "../../../api/userService";
import MaterialTable from 'material-table'
import { AiFillEdit } from 'react-icons/ai'
import swal from 'sweetalert';

import "./OrdersList.css";
import { margin } from "@mui/system";

function OrdersList() {
  // React States
  const [orders, setOrders] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleFilterChange = (value) => {
    setStatusFilter(value)

    if (value === 'all') setOrders(allOrders)
    else {
      const filteredOrders = allOrders.filter( orderElem => orderElem.status === value)
      setOrders(filteredOrders)
    }
  }

  const updateStatus = async (status, orderId) => {
    const data = await updateOrderStatus(orderId, status)
    if (data.status) swal("Succés", "Statut changé avec succés !", "success");
    else swal("Erreur", data.message, "error");
    window.location.reload();
  }

  const selectStyle = {
    padding: "8px",
    borderRadius: "5px",
    margin: "2px",
    borderColor: "grey"
  }

  const getStyleByStatus = (status) => {
    let color
    if (status === 'created') color = 'darkgoldenrod'
    else if (status === 'accepted') color = 'darkgreen'
    else color = 'darkred'
    return { backgroundColor: color, ...selectStyle }
  }

  const renderSelect = (orderId, status) =>
    <select
      name="status"
      id="status-select"
      style={getStyleByStatus(status)}
      onChange={event => updateStatus(event.target.value, orderId)}
      value={status || "created"} >
      <option value="accepted">traité</option>
      <option value="created">en attente</option>
      <option value="denied">annulé</option>
    </select>


  const columns = [
    {
      field: 'clientName',
      title: 'Nom',
      filtering: false
    },
    {
      field: 'clientPhone',
      title: 'Numéro',
      filtering: false
    },
    {
      field: 'totalPrice',
      title: 'Prix total',
      filtering: false
    },
    {
      field: 'products',
      title: 'Produits',
      filtering: false
    },
    {
      field: 'status',
      title: 'statut',
      render: item => renderSelect(item._id, item.status),
      filtering: false
    },
  ]

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (pageSize) => {
    setRowsPerPage(pageSize);
    setPage(0);
  };

  const fetchData = async () => {
    const data = await getOrders()
    if (data.status) {
      setOrders(data.data)
      setAllOrders(data.data)
      setLoading(false)
    }
    

  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container fluid>
      {
        loading
          ? <div>Loading</div>
          : <div>
            <div>
              <select
                className="filter-select"
                name="ordersFilter"
                id="filter-select"
                onChange={event => handleFilterChange(event.target.value)}
                value={statusFilter} >
                  <option value="all">tous</option>
                <option value="accepted">traité</option>
                <option value="created">en attente</option>
                <option value="denied">annulé</option>
              </select>
            </div>
            <div className="main-screen ">
              <MaterialTable
                title={<h1>Produits</h1>}
                data={orders}
                columns={columns}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                totalCount={orders.length}
                localization={{
                  toolbar: {
                    searchPlaceholder: 'Que cherchez-vous?'
                  }
                }}
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


export default OrdersList;