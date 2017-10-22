import React from 'react';
import { Field, reduxForm } from 'redux-form'


const messageForm = (props) => {

  function handleFormSubmit({text}){
    const { createMessage, reset, socket} = props;
    createMessage(socket, {
      from: 'michal',
      text,
      createdAt: new Date().getTime()
    });
    reset();
  }
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Field 
      name="text"
      component="input"
      type="text"
      />
      <button type="submit" >Send</button>
    </form>
  );
}


export default reduxForm({
  form: 'message'
})(messageForm);