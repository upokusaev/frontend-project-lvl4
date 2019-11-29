import React, { useEffect, useContext } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import { addMessage } from './messagesSlice.jsx'
import routes from '../../routes'
import { UserNameContext } from '../../components/App.jsx'
// import cn from 'classnames';

const socket = io();

const mapStateToProps = (state) => ({
  channelId: state.channels.currentChannelId,
})

const mapDispatch = { addMessage };


const AddMessage = ({ channelId, addMessage}) => {

  const userName = useContext(UserNameContext);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      addMessage(data);
    });

    return () => {
      socket.off('newMessage');
    }
  })

  const handleSumbitForm = ({ text }, { setSubmitting, resetForm }) => {
    const body = {
      data: { 
        attributes: { 
          text,
          userName
        }
      }
    }
    axios.post(routes.channelMessagesPath(channelId), body)
      .then((data) => {
        console.log(data);
        return data;
      })
      .then(({status}) => {
        if (status === 201) {
          resetForm();
        } else {
          console.log('ОШИБКА СЕТИ');
        }
        setSubmitting(false);
      });
  }

  return (
    <div className="d-flex flex-column w-100">
      <Formik
        initialValues={{ text: '' }}
        validate={values => {
          const errors = {};
          if (!values.text) {
            errors.email = 'Required';
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
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
          <div className="form-group form-check d-flex w-100">
            <input
                type="text"
                name="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
                className="d-flex w-100"
              />
              {errors.text && touched.text && errors.text}
            <button type="submit" className="btn btn-warning d-flex h-100 ml-1 mr-2" disabled={isSubmitting}>
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
  mapDispatch
)(AddMessage)
