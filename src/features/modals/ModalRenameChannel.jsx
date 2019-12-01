import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { actions } from './modalsSlice.jsx';
import routes from '../../routes';

const mapStateToProps = (state) => ({
  channelId: state.modals.modalProps.channelId,
  channelName: state.modals.modalProps.channelName,
});

const mapDispatchToProps = {
  hideModal: actions.hideModal,
};

const ModalRenameChannel = ({ hideModal, channelId, channelName }) => {
  const handleRename = ({ text }, { setSubmitting, resetForm }) => {
    const body = {
      data: {
        attributes: {
          name: text,
        },
      },
    };

    axios.patch(routes.channelPath(channelId), body)
      .then(resetForm)
      .then(hideModal)
      .catch(() => {
        throw new Error('Connection error'); // ПЕРЕДЕЛАТЬ
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Введите новое имя для канала
          <b>{` ${channelName} `}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ text: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.text) {
              errors.text = 'Имя канала не может быть пустым';
            }
            return errors;
          }}
          onSubmit={handleRename}
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
                  Переименовать
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
  mapStateToProps,
  mapDispatchToProps,
)(ModalRenameChannel);
