import * as conf from './Config';
import firebase from 'firebase';
import React from 'react';


import {$,jQuery} from 'jquery';


import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

export default class Access extends React.Component {

  createAccount(email, password, repassword, firstname, lastname) {
    if (repassword === password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        }).then(function() {
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: firstname + ' ' + lastname,
          }).then(function() {

          });
        })
    } else {
      alert('The password is not the same.');
    }
  }

  signInWithUsernamePassword(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode)
            $('#message').closest('.row').removeClass('hide');
            $('#message').html('Username or password is wrong.');
        });
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  renderSignIn() {
    return (
      <div className='row'>
      <div className='col s12 m6 offset-m3'>
        <div className='card-panel'>
          <h2> Log In </h2>

          <div className='row'>
            <div className='input-field col s12'>
              <input id='email' type='email' className='validate'></input>
              <label for='email'>Email</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <input id='password' type='password' className='validate'></input>
              <label for='password'>Password</label>
            </div>
          </div>

          <div className='row hide'>
          	<div className="col s12 m12">
        			<div className="card-panel red white-text">
                <span id='message'></span>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <button className='waves-effect waves-light btn' onClick=
                {
                  (event) => {
                    this.signInWithUsernamePassword(
                      $('#email').val(),
                      $('#password').val()
                    )
                  }
                }
              >Sign In</button>
            </div>
          </div>

        </div>
      </div>
    </div>
    )
  }

  renderSignUp() {
    return (
      <div className='row'>
      <div className='col offset-m3 s12 m6'>
        <div className='card-panel'>
          <h2> Sign Up </h2>

          <div className='row'>
            <div className='input-field col s6'>
              <input id='firstname' type='text' className='validate'></input>
              <label for='firstname'>First Name</label>
            </div>
            <div className='input-field col s6'>
              <input id='lastname' type='text' className='validate'></input>
              <label for='lastname'>Last Name</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <input id='email' type='email' className='validate'></input>
              <label for='email'>Email</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <input id='password' type='password' className='validate'></input>
              <label for='password'>Password</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <input id='repassword' type='password' className='validate'></input>
              <label for='repassword'>Retype Password</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <button className='waves-effect waves-light btn' onClick={
                  (event) => {
                    this.createAccount(
                  		$('#email').val(),
                  		$('#password').val(),
                  		$('#repassword').val(),
                  		$('#firstname').val(),
                  		$('#lastname').val()
                		)
                 	}
                }
            >Sign Up</button>
            </div>
          </div>

        </div>
      </div>
    </div>
    )
  }

  render() {
    return (
      <div>
      	{this.renderSignIn()}
      </div>
    )
  }
};
