import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Box, Modal, TextField, Container, Select, MenuItem, InputLabel, FormControl, Alert } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AlertTitle } from '@mui/material'
import { createApi } from '../../../Auth/AuthFunction'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
export default function UpdateCertificate(props) {
  const dataColors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const dataClarity = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"]
  const dataCut = ["Excellent", "VeryGood", "Good", "Fair", "Poor"].reverse()
  const dataOrigin = ["GIA", "IGI", "AGS", "HRD", "EGL", "CGL"]
  const [dataCertificate, setDataCertificate] = useState(null)
  const [responseStatus, setResponseStatus] = useState(null)
  const [responseMessage, setResponseMessage] = useState(null)
  const ITEM_HEIGHT = 120;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setResponseMessage(null)
    setResponseStatus(null)
  }

  useEffect(() => {
    const getCertificate = () => {
      const url = createApi(`Certificate/GetCertificate/${props.data.id}`)
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(response => response.json())
        .then(responseData => {
          setDataCertificate(responseData)

        })
        .catch((error) => console.error('Error:', error))
    }
    getCertificate()
  }, [props.data.id])

  const validationSchema = Yup.object({
    reportNumber: Yup.string().required('Required'),
    origin: Yup.string().required('Required'),
    color: Yup.string().required('Required'),
    clarity: Yup.string().required('Required'),
    cut: Yup.string().required('Required'),
    caratWeight: Yup.number().required('Required').positive('Must be positive'),
    dateOfIssue: Yup.string().required('Required'),
  })

  const initialValues = {
    reportNumber: dataCertificate?.reportNumber || '',
    origin: dataCertificate?.origin || '',
    color: dataCertificate?.color || '',
    clarity: dataCertificate?.clarity || '',
    cut: dataCertificate?.cut || '',
    caratWeight: dataCertificate?.caratWeight || '',
    dateOfIssue: dayjs(dataCertificate?.dateOfIssue).utc().add(7, 'hours') || '',
  }



  const onSubmit = (values) => {
    Create(values)
    // formik.resetForm()
  }


  function Create(Values) {
    console.log(Values)
    const url = createApi(`Certificate/UpdateCertificate/${props.data.id}`)
    const data = {
      reportNumber: Values.reportNumber,
      origin: Values.origin,
      color: Values.color,
      clarity: Values.clarity,
      cut: Values.cut,
      caratWeight: Values.caratWeight,
      dateOfIssue: Values.dateOfIssue,
    }
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        setResponseStatus(response.status)

      })
      .then(responseData => {
        setResponseMessage('Update Certificate Failed')
        handleClose()
        props.onCertificateUpdated()
      })
  }

  return (
    <>
      <Button onClick={handleOpen}>Update Certificate</Button>
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
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
          overflow: 'auto',
          height: '100vh',
          width: '100vw',
        }}>
          <h3 className='titleOfForm'>UPDATE CERTIFICATE</h3>
          <Container>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleChange, values, setFieldValue }) => {
                const handleDateChange = (newValue) => {
                  // Ensure newValue is converted to a dayjs object before setting the field value
                  setFieldValue('dateOfIssue', dayjs(newValue));
                }

                return (
                  <Form>
                    <div className='row'>
                      <div className='col'>
                        <Field
                          name="reportNumber"
                          as={TextField}
                          label="Report Number"
                          onChange={handleChange}
                          value={values.reportNumber}
                          style={{
                            width: '100%',
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <ErrorMessage name="reportNumber">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                      <div className='col'>
                        <Button variant='contained'
                          sx={{
                            width: '100%',
                            height: '56px',
                            fontWeight: 'bold',
                          }}
                          onClick={() => {
                            const newReportNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
                            setFieldValue('reportNumber', newReportNumber);
                          }}>
                          Generate report number
                        </Button>
                      </div>
                    </div> <br />
                    <div className='row'>
                      <div className='col'>
                        <FormControl fullWidth>
                          <InputLabel>Origin</InputLabel>
                          <Field
                            name="origin"
                            as={Select}
                            id="origin"
                            label="Origin"
                            onChange={handleChange}
                            value={values.origin}
                            MenuProps={MenuProps}
                          >
                            {dataOrigin && dataOrigin.map((item, index) => (
                              <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                        <ErrorMessage name="origin">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                      <div className='col'>
                        <FormControl fullWidth>
                          <InputLabel>Color</InputLabel>
                          <Field
                            name="color"
                            as={Select}
                            id="color"
                            label="Color"
                            onChange={handleChange}
                            value={values.color}
                            MenuProps={MenuProps}
                          >
                            {dataColors && dataColors.map((item, index) => (
                              <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                        <ErrorMessage name="origin">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                      <div className='col'>
                        <FormControl fullWidth>
                          <InputLabel>Clarity</InputLabel>
                          <Field
                            name="clarity"
                            as={Select}
                            id="clarity"
                            label="Clarity"
                            onChange={handleChange}
                            value={values.clarity}
                            MenuProps={MenuProps}
                          >
                            {dataClarity && dataClarity.map((item, index) => (
                              <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                        <ErrorMessage name="origin">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                      <div className='col'>
                        <FormControl fullWidth>
                          <InputLabel>Cut</InputLabel>
                          <Field
                            name="cut"
                            as={Select}
                            id="cut"
                            label="Cut"
                            onChange={handleChange}
                            value={values.cut}
                            MenuProps={MenuProps}
                          >
                            {dataCut && dataCut.map((item, index) => (
                              <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                        <ErrorMessage name="origin">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                    </div> <br />
                    <div className='row'>
                      <div className='col'>
                        <Field
                          name="caratWeight"
                          as={TextField}
                          label="Carat Weight"
                          onChange={handleChange}
                          value={values.caratWeight}
                          style={{
                            width: '100%',
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                        />
                        <ErrorMessage name="caratWeight">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                      <div className='col'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker sx={{
                            width: '100%',
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                            label="Date of issue"
                            value={dayjs(values.dateOfIssue)}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                        <ErrorMessage name="dateOfIssue">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                    </div> <br />
                    <div className='row'>
                      <div className='col'>
                        <Button
                          fullWidth
                          type='submit'
                          variant='contained'
                          color='primary'
                        >
                          Submit
                        </Button>
                      </div>
                      <div className='col'>
                        <Button
                          fullWidth
                          variant='contained'
                          color='error'
                          onClick={handleClose}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik> <br />
            <div>
              {responseStatus && (responseStatus.toString().startsWith('2')
                ? <Alert severity="success">
                  <AlertTitle>
                    Update Certificate Successful
                  </AlertTitle>

                </Alert>
                : <Alert severity="error">
                  <AlertTitle>
                    {responseMessage}
                  </AlertTitle>

                </Alert>)}
            </div>
          </Container>

        </Box>
      </Modal >
    </>
  )
}
