import React, { useState } from 'react'
import { Button, TextField, Modal, Box, Alert, Radio, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import CloseIcon from '@mui/icons-material/Close'
import { createApi } from '../../../Auth/AuthFunction'

export default function UpdateCollection(props) {
  console.log(props.id)
  const [open, setOpen] = useState(false)
  const [displayStatus, setDisplayStatus] = useState(false)
  const [responseCode, setResponseCode] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setDisplayStatus(false)
    setResponseCode('')
  }
  const handleDisplay = () => setDisplayStatus(true)
  const handleClear = () => setDisplayStatus(false)

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  })

  const initialValues = {
    name: props.name,
  }

  const onSubmit = (values) => {
    Update(values)

  }

  const Update = (values) => {
    const url = createApi(`Collection/UpdateCollection/${props.id}`)
    const data = {
      "name": values.name,
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
        setResponseCode(response.status);
        if (response.status === 204 || response.headers.get("content-length") === "0") {
          // No content to parse
          return null;
        } else {
          return response.json();
        }
      })
      .then(responseData => {
        if (responseData) {
          setResponseCode(responseData.status);
        }
      })
      .catch(error => {
        console.error("Error parsing JSON:", error);
      })
    props.onCollectionUpdated()
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Button variant="contained" type="button" size="large" onClick={handleOpen}>
        Update
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
          bgcolor: 'background.paper',
          p: 4,
          overflow: 'auto',
          height: '100vh',
          width: '100vw',
        }}>
          <h3 className='titleOfForm'>UPDATE COLLECTION</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            style={{ width: '100%' }}
          >
            {({ handleChange, values }) => (
              <Form>
                <div className='row'>
                  <div className='col-12'>
                    <Field
                      name="name"
                      as={TextField}
                      label="Name"
                      onChange={handleChange}
                      value={values.name}
                      style={{ width: '100%' }}
                    />
                    <ErrorMessage name="name">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                </div> <br />
                <div className='formSubmit' >
                  <Button
                    type="submit"
                    className='submitButton'
                    value="Submit" variant="contained"
                    size="large" endIcon={<SendIcon />}
                    sx={{
                      margin: '5px',
                    }}
                    onClick={handleDisplay}
                  >
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
              </Form>
            )}
          </Formik>
          {displayStatus && (
            <>
              {
                String(responseCode).startsWith('2') && String(responseCode).startsWith('2') &&
                <Alert severity="success" variant="filled">Update Collection successfully</Alert>
              }
              {
                !String(responseCode).startsWith('2') &&
                <Alert severity="error" variant="filled"> Update Collection failed</Alert>
              }
            </>
          )}
          <Button type="button"
            value="Clear" onClick={handleClose}
            className='submitButton'
            variant="contained" size="large" color="error"
            endIcon={<CloseIcon />}
            sx={{
              margin: '5px',
            }}>
            Close
          </Button>
        </Box >
      </Modal>
    </div >
  )
}
