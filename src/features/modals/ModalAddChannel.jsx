import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import { actions } from './modalsSlice.jsx';
import routes from '../../routes';

const mapDispatchToProps = {
  hideModal: actions.hideModal,
};

const ModalAddChannel = ({ hideModal }) => {
  const handleSumbitForm = ({ text }, { setSubmitting, resetForm }) => {
    const body = {
      data: {
        attributes: {
          name: text,
        },
      },
    };

    axios.post(routes.channelsPath(), body)
      .then(() => resetForm())
      .then(() => hideModal())
      .catch(() => {
        throw new Error('Connection error'); // ПЕРЕДЕЛАТЬ
      })
      .finally(() => setSubmitting(false));
  };


  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Введите имя нового канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ text: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.text) {
              errors.text = 'Имя канала не может быть пустым';
            }
            if (values.text.length > 15) {
              errors.text = 'Макс.длина - 15 символов';
            }
            return errors;
          }}
          onSubmit={handleSumbitForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group form-check d-flex w-100">
                <input
                  type="text"
                  name="text"
                  placeholder={errors.text && touched.text && errors.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.text}
                  className="d-flex w-100 pl-1"
                />
                <button
                  type="submit"
                  className="btn btn-warning d-flex h-100 ml-1 mr-1"
                  disabled={isSubmitting}
                >
                  Добавить
                </button>
                <Button variant="dark" onClick={hideModal}>
                  Отмена
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default connect(
  null,
  mapDispatchToProps,
)(ModalAddChannel);
