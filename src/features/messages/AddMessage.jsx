import React, { useContext } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import axios from 'axios';
import UserNameContext from '../../conexts/userNameContext.jsx';
import routes from '../../routes';

const mapStateToProps = (state) => ({
  channelId: state.channels.currentChannelId,
});

const AddMessage = ({ channelId }) => {
  const userName = useContext(UserNameContext);

  const handleSumbitForm = ({ text }, { setSubmitting, resetForm }) => {
    const body = {
      data: {
        attributes: {
          text,
          userName,
        },
      },
    };

    axios.post(routes.channelMessagesPath(channelId), body)
      .then(() => resetForm())
      .catch(() => {
        throw new Error('Connection error'); // ПЕРЕДЕЛАТЬ
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="d-flex flex-column w-100 pt-3 border-top">
      <Formik
        initialValues={{ text: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.text) {
            errors.text = 'Сообщение не может быть пустым';
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
                placeholder={(errors.text && touched.text && errors.text) || 'Введите сообщение'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
                className="d-flex w-100 pl-1"
              />
              <button
                type="submit"
                className="btn btn-warning d-flex h-100 ml-1 mr-2"
                disabled={isSubmitting}
              >
                Отправить
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default connect(
  mapStateToProps,
  null,
)(AddMessage);
