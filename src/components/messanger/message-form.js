import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

import moment from 'moment';

import { connect } from 'react-redux';



class MessageForm extends Component {

  handleFormSubmit({text}){
    const { createMessage, reset, socket, user} = this.props;
    createMessage(socket, {
      from: user,
      text,
      createdAt: moment().valueOf()
    });
    reset();
  }

  render(){
  const { handleSubmit } = this.props;

  return (
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <Field 
      name="text"
      component="input"
      type="text"
      autoComplete="off"
      />
      <button type="submit" >Send</button>
    </form>
  );
  }
}

function mapStateToProps(state){
  return { user: state.app.user }
}

export default reduxForm({
  form: 'message'
})(connect(mapStateToProps)(MessageForm));