import React, { Component } from 'react';

import { connect } from 'react-redux';

import { reduxForm, Field } from 'redux-form';

import * as actions  from '../../actions';


class JoinRoom extends Component {

  submitForm(values){
    const { reset } = this.props;
    this.props.joinRoom(values);
    this.props.history.push('/chat');    
  }

  render() {
    const { handleSubmit, reset } = this.props;
    return (
      <div className="centered-form">
        <div className="centered-form__form">
          <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
            <div className="form-field">
                <h3>Join a Chat</h3>
            </div>
            <div className="form-field">
              <Field name="name"
                type="text"
                component="input"
                placeholder="Name" />
            </div>

            <div className="form-field">
              <Field name="room"
                type="text"
                component="input"
                placeholder="Room" />
            </div>
            <div className="form-field">
              <button type="submit">Join</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}




export default reduxForm({
  form: 'join-room'
})(connect(null, actions)(JoinRoom));