import * as React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { ValidationEvent } from '../../formValidation/events';

export default function ModalEditEvent(props) {
  const URL = "http://localhost:8080/";

  const handleClose = () => {
    props.setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      idevent: props.idevent,
      description: props.description,
      start: props.start,
      finish: props.finish,
    },
    validationSchema: ValidationEvent,
  });

  const editEvent = () => {
    if (!formik.errors.description && !formik.errors.start && !formik.errors.finish){
      alert(`Evento editado com sucesso!`);
      handleClose();

      axios.put(`${URL}edit-event/${formik.values.idevent}`, {
        description: formik.values.description,
        start: formik.values.start,
        finish: formik.values.finish,
      });
    } else return;
  }

  return (
    <React.Fragment>
        <Dialog
          open={props.open}
          onClose={handleClose}
        >
        <div className='container-modal'>
          <DialogTitle>Editar evento</DialogTitle>
          <DialogContent>
            <form onBlur={formik.handleSubmit}>
            <label htmlFor="description"><strong>Descrição</strong></label>
            <TextField
                fullWidth
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                sx={{ my:'8px' }}
            />

            <label htmlFor="start"><strong>Início</strong></label>
            <TextField
                fullWidth
                type="datetime-local"
                id="start"
                name="start"
                value={formik.values.start}
                onChange={formik.handleChange}
                error={formik.touched.start && Boolean(formik.errors.start)}
                helperText={formik.touched.start && formik.errors.start}
                sx={{ my:'8px' }}
            />
            
            <label htmlFor="finish"><strong>Término</strong></label>
            <TextField
                fullWidth
                type="datetime-local"
                id="finish"
                name="finish"
                value={formik.values.finish}
                onChange={formik.handleChange}
                error={formik.touched.finish && Boolean(formik.errors.finish)}
                helperText={formik.touched.finish && formik.errors.finish}
                sx={{ my:'8px' }}
            />
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type='submit' onClick={() => editEvent()}>Salvar</Button>
            <Button onClick={handleClose}>Fechar</Button>
          </DialogActions>
        </div>
        </Dialog>
    </React.Fragment>
  );
}