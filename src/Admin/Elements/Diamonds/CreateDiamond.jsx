import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Alert, Modal } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import { styled } from '@mui/material/styles'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import { createApi } from '../../../Auth/AuthFunction';

export default function CreateDiamond(props) {
  const [image, setImage] = useState([])
  const [open, setOpen] = useState(false)
  const dataColors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const dataClarity = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"]
  const dataCut = ["Excellent", "Very Good", "Good", "Fair", "Poor"].reverse()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)

  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  const ITEM_HEIGHT = 120;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }

  const handleImageChange = (e) => {
    setImage((prevImages) => [...prevImages, ...e.target.files])
  }

  const handleClear = () => {
    formik.resetForm()
    setImage([])
  }

  const handleDeleteImage = (index) => {
    setImage((currentImages) => currentImages.filter((_, i) => i !== index))
  }

  async function Create(values) {
    const url = createApi('Diamond/CreateDiamond')

    const formData = new FormData();
    formData.append('Origin', values.origin);
    formData.append('Color', values.color);
    formData.append('CaratWeight', values.caratWeight);
    formData.append('Clarity', values.clarity);
    formData.append('Cut', values.cut);
    formData.append('Name', values.name);
    formData.append('Price', values.price);
    formData.append('Quantity', values.quantity);


    // Lặp qua mỗi file và thêm vào FormData
    for (let i = 0; i < image.length; i++) {
      const file = image[i];
      const fieldName = 'ProductImages';
      const fieldValue = new File([file], `${file.name}`, { type: 'image/jpeg' });
      formData.append(fieldName, fieldValue);
    }
    console.log(values)
    const responseCreateProduct = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
      },
      body: formData
    });
    const responseData = await responseCreateProduct.json();
  }

  const validationSchema = Yup.object({
    origin: Yup.string().required('Origin is required'),
    color: Yup.string().required('Color is required'),
    caratWeight: Yup.number()
      .required('Carat Weight is required')
      .positive('Carat Weight must be positive')
      .min(0.1, 'Carat Weight must be at least 0.1')
      .max(10.2, 'Carat Weight must be 10.2 or less'),
    clarity: Yup.string().required('Clarity is required'),
    cut: Yup.string().required('Cut is required'),
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive').integer('Quantity must be an integer'),
  });

  const formik = useFormik({
    initialValues: {
      origin: '',
      color: '',
      caratWeight: '',
      clarity: '',
      cut: '',
      name: '',
      price: '',
      quantity: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const modifiedValues = {
        ...values,
        price: parseFloat(values.price),
      };
      Create(modifiedValues);
    },
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      marginRight: '10vw',
      marginTop: '2vh'
    }}>
      <Button variant="contained" type="button" size="large" onClick={handleOpen}>
        CREATE DIAMOND
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <h3 className='titleOfForm'>CREATE DIAMOND</h3>
          <div>
            <form onSubmit={formik.handleSubmit} >
              <div className='row'>
                <div className='col'>
                  <TextField type="text" value={formik.values.origin}
                    onChange={formik.handleChange}
                    name="origin"
                    id="outlined-basic"
                    label="Origin"
                    variant="outlined"
                    className='form-control' />
                  {formik.touched.nameProduct && formik.errors.nameProduct &&
                    (<Alert severity="error">{formik.errors.origin}</Alert>)}
                </div>
              </div> <br />
              <div className='row'>
                <div className='col-3'>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Color</InputLabel>
                    <Select labelId="select-label" name='color'
                      id="demo-simple-select" variant="outlined"
                      label="Color" value={formik.values.color}
                      onChange={formik.handleChange} className='form-control'
                      MenuProps={MenuProps}
                      sx={{
                        padding: '0'
                      }}>
                      {dataColors.map((color, index) => (
                        <MenuItem key={index} value={color}>{color}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.color && formik.errors.color &&
                    (<Alert severity="error">{formik.errors.color}</Alert>)}
                </div>

                <div className='col-3'>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Clarity</InputLabel>
                    <Select labelId="select-label" name='clarity'
                      id="demo-simple-select" variant="outlined"
                      label="Clarity" value={formik.values.clarity}
                      onChange={formik.handleChange} className='form-control'
                      MenuProps={MenuProps}
                      sx={{
                        padding: '0'
                      }}>
                      {dataClarity.map((clarity, index) => (
                        <MenuItem key={index} value={clarity}>{clarity}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.clarity && formik.errors.clarity &&
                    (<Alert severity="error">{formik.errors.clarity}</Alert>)}
                </div>

                <div className='col-3'>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Cut</InputLabel>
                    <Select labelId="select-label" name='cut'
                      id="demo-simple-select" variant="outlined"
                      label="Clarity" value={formik.values.cut}
                      onChange={formik.handleChange} className='form-control'
                      MenuProps={MenuProps}
                      sx={{
                        padding: '0'
                      }}>
                      {dataCut.map((cut, index) => (
                        <MenuItem key={index} value={cut}>{cut}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.cut && formik.errors.cut &&
                    (<Alert severity="error">{formik.errors.cut}</Alert>)}
                </div>

                <div className='col-3'>
                  <TextField type="text" value={formik.values.caratWeight}
                    onChange={formik.handleChange}
                    name='caratWeight' id="outlined-basic"
                    label="Carat Weight" variant="outlined"
                    className='form-control' />
                  {formik.touched.caratWeight && formik.errors.caratWeight &&
                    (<Alert severity="error">{formik.errors.caratWeight}</Alert>)}
                </div>
              </div>

              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<FileUploadIcon />}
                >
                  Upload image
                  <VisuallyHiddenInput type="file" multiple onChange={handleImageChange} />
                </Button>
                {image.length > 0 && (
                  <Grid container columnSpacing={3}>
                    {image.map((image, index) => (
                      <>
                        <Grid item xs={3}>
                          <Card sx={{
                            width: 'auto',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.1)',
                              borderRadius: '10px',
                            }
                          }}>
                            <CardContent>
                              <img src={URL.createObjectURL(image)} alt="" style={{
                                width: '100%',
                                borderRadius: '10px',
                              }} />
                              <p key={index}>{image.name}</p>
                            </CardContent>

                            <div style={{ textAlign: 'right' }}>
                              <Button
                                color="error"
                                endIcon={<DeleteIcon sx={{ color: 'red', margin: 0, padding: 0 }} />}
                                onClick={() => handleDeleteImage(index)}>
                                Delete
                              </Button>
                            </div>
                          </Card>
                        </Grid >
                      </>
                    ))}
                  </Grid>
                )}
              </div> <br />

              <div className='row'>
                <div className='col-6'>
                  <TextField type="text" name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    id="outlined-basic" label="Name"
                    variant="outlined" className='form-control' />
                  {formik.touched.name && formik.errors.name &&
                    (<Alert severity="error">{formik.errors.name}</Alert>)}
                </div>

                <div className='col-6'>
                  <TextField type="text" name='price'
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    id="outlined-basic" label="Price"
                    variant="outlined" className='form-control' />
                  {formik.touched.price && formik.errors.price &&
                    (<Alert severity="error">{formik.errors.price}</Alert>)}
                </div> <br />

                <div className='col-6'>
                  <TextField type="text" name='quantity'
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    id="outlined-basic" label="Quantity"
                    variant="outlined" className='form-control' />
                  {formik.touched.quantity && formik.errors.quantity &&
                    (<Alert severity="error">{formik.errors.quantity}</Alert>)}
                </div>
              </div>
              <div className='formSubmit' >
                <Button
                  type="submit"
                  className='submitButton'
                  value="Submit" variant="contained"
                  size="large" endIcon={<SendIcon />}
                  sx={{
                    margin: '5px',
                  }}>
                  Send
                </Button>
                <Button type="button"
                  value="Clear" onClick={handleClear}
                  className='submitButton'
                  variant="contained" size="large" color="error"
                  endIcon={<CancelScheduleSendIcon />}
                  sx={{
                    margin: '5px',
                  }}>
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </Box >
      </Modal>
    </div >
  )
}