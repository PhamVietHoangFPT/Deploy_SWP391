import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { createApi } from '../Auth/AuthFunction'
import { Button, Modal, Box, TableRow, TableCell, TableBody, TableHead, Table, TableContainer, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
export default function Order() {
  const [order, setOrder] = useState([])

  const [openPayment, setOpenPayment] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  const [warranty, setWarranty] = useState([])
  const [openWarranty, setOpenWarranty] = useState(false)
  const handleOpen = (id) => {
    setOpenPayment(true)
    getOrderDetail(id)
  }
  const handleClose = () => {
    setOpenPayment(false)
  }

  const handleOpenDetail = (id) => {
    setOpenDetail(true)
    getOrderDetail(id)
    getWarranty(id)
  }

  const handleCloseDetail = (id) => {
    setOpenDetail(false)
  }

  const handleOpenWarranty = () => {
    setOpenWarranty(true)
  }

  const styleOrderContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px',
    padding: '20px',
    border: '1px solid black',
    borderRadius: '10px',
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    boxShadow: '0 0 10px 5px rgba(0,0,0,0.3)',
  }

  const styleButton = {
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    }
  }

  useEffect(() => {
    const getOrder = () => {
      const url = createApi('Order/Get')
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => response.json())
        .then(data => {
          setOrder(data)
        })
    }
    getOrder()
  }, [])

  const getOrderDetail = (id) => {
    const url = createApi(`Order/GetProductDetailById/${id}`);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => response.json())
      .then(data => {
        setOrderDetail(data)
      })
  }

  const getWarranty = (id) => {
    const url = createApi(`WarrantyDocument?orderId=${id}`)
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => response.json())
      .then(data => {
        setWarranty(data)
      })
  }

  console.log(warranty)

  const headerTable = ['#', 'Order date', 'Total price', 'Status', '']
  const headerTableDetail = ['Image', 'Name', 'Quantity', 'Total price']


  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>

      <div style={{
        paddingBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}>
          <h1>Order</h1>
        </div>
        <div style={styleOrderContainer}>
          <TableContainer component={Paper} fullWidth>
            <Table >
              <TableHead sx={{
                width: '100%'
              }}>
                <TableRow>
                  {headerTable.map((item, index) => (
                    <TableCell key={index} sx={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}>
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{
                width: '100%'
              }}>
                {order && order.sort((a, b) => a.status.localeCompare(b.status)).map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {new Date(item.createdDate).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell>
                      {item.totalPrice}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained"
                        color={item.status === 'Approved' ? 'success' : item.status === 'Wait To Approve' ? 'error' : item.status === 'Paid' ? 'primary' : 'warning'}>
                        {item.status}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {item.status === 'Approved' ?
                        <Button variant='contained' size='large' endIcon={<PaymentOutlinedIcon />} sx={styleButton} onClick={() => handleOpen(item.id)}>
                          Pay now
                        </Button> :
                        <Button variant='contained' size='large' onClick={() => handleOpenDetail(item.id)} sx={{
                          backgroundColor: '#f1c232',
                          color: '#000',
                          '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                          }
                        }}>
                          Detail
                        </Button>
                      }
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      </div>
      <Modal
        open={openPayment}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          width: '80%',
          p: 4,
          overflow: 'auto',
        }}>
          <div>
            <h2>Payment</h2>
            <Table >
              <TableHead>
                <TableRow sx={{
                  backgroundColor: '#001529',
                }}>
                  {headerTable.map((item, index) => (
                    <TableCell key={index} sx={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}>
                      {item}
                    </TableCell>

                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetail.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img src={item.cart.product ? (item.cart.product.images[0].urlPath) : null} style={{
                        width: '150px',
                        height: '150px',
                      }} />
                    </TableCell>
                    <TableCell>{item.cart.product ? (item.cart.product.name) : null}</TableCell>
                    <TableCell>{item.cart.quantity}</TableCell>
                    <TableCell>${item.cart.totalPrice.toLocaleString()}</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <div>
              <Button>
                <img src="https://payos.vn/docs/img/logo.svg" alt="" style={{
                  height: '100px',
                }} />
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openDetail}
        onClose={handleCloseDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          width: '80%',
          p: 4,
        }}>
          <div>
            <h2>Detail</h2>
            <Table >
              <TableHead>
                <TableRow sx={{
                  backgroundColor: '#001529',
                }}>
                  {headerTableDetail.map((item, index) => (
                    <TableCell key={index} sx={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}>
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetail.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img src={item.cart.product ? (item.cart.product.images[0].urlPath) : item.cart.diamond.images[0]?.urlPath} style={{
                        width: '150px',
                        height: '150px',
                      }} />
                    </TableCell>
                    <TableCell>{item.cart.product ? (item.cart.product.name) : (item.cart.diamond.name)}</TableCell>
                    <TableCell>{item.cart.quantity}</TableCell>
                    <TableCell>${item.cart.totalPrice.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div>
              <Button onClick={handleOpenWarranty}>
                Show Warranty
              </Button>
              {openWarranty && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',

                }}>
                  <div>
                    <h4>
                      Customer Name: {warranty.account.name}
                    </h4>
                  </div>
                  <div>
                    <h4>
                      Customer Email: {warranty.account.email}
                    </h4>
                  </div>
                  <div>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableCell>
                            <h4>
                              Product Name
                            </h4>
                          </TableCell>
                          <TableCell>
                            <h4>
                              Period
                            </h4>
                          </TableCell>
                          <TableCell>
                            <h4>
                              Warranty
                            </h4>
                          </TableCell>
                        </TableHead>
                      </Table>
                    </TableContainer>

                    {warranty.orderProducts.map((item, index) => (
                      <TableBody key={index}>
                        <TableCell>
                          {item.name}
                        </TableCell>
                        <TableCell>
                          {new Date(warranty.warrantyDocuments[index].period).toLocaleDateString('en-US')}
                        </TableCell>
                        <TableCell>
                          {warranty.warrantyDocuments[index].termsAndConditions}
                        </TableCell>
                      </TableBody>

                    ))}

                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div >
  )
}
