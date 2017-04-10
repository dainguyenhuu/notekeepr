import * as conf from './Config';
import firebase from 'firebase';
import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {$,jQuery} from 'jquery';
import 'materialize-css/js/velocity.min.js';

export default class Notes extends React.Component {

  insertNote(title, content) {
    const uid = firebase.auth().currentUser.uid;

    const notesRef = firebase.database().ref('/notes/' + uid);

    const noteData = {
      title: title,
      content: content
    };

    const newNoteKey = firebase.database().ref().child('notes').push().key;

    const updates = {};

    updates['/notes/' + uid + '/' + newNoteKey] = noteData;

    return firebase.database().ref().update(updates);

  }

  updateNote(key, title, content) {
    const uid = firebase.auth().currentUser.uid;
    const notesRef = firebase.database().ref('/notes/' + uid + '/' + key);

    const noteData = {
      title: title,
      content: content
    };

    const updates = {};

    updates['/notes/' + uid + '/' + key] = noteData;

    return firebase.database().ref().update(updates);
  }

  deleteNote(key) {
    const uid = firebase.auth().currentUser.uid;
    const notesRef = firebase.database().ref('/notes/' + uid + '/' + key);
    notesRef.remove();
  }

  componentDidMount() {
    window.$('.modal').modal();
  }

  render() {
    const that = this;
    const notesData = this.props.notes;
    const data = notesData.val();
    const notes = Object.keys(data).map(function (key) {
      console.log(data[key]);
      return <Note key={key} id={key} title={data[key].title} content={data[key].content} delete={that.deleteNote} edit={that.updateNote}/>;
    });

    return (
    	<div>
        <nav>
          <div className='nav-wrapper'>
            <form>
              <div className='input-field'>
                <input id='search' type='search' placeholder='Search' required></input>
                <label className='label-icon' for='search'><i className='material-icons'>search</i></label>
                <i className='material-icons'>close</i>
              </div>
            </form>
          </div>
        </nav>

        <div className='fixed-action-btn'>
          <a className='btn-floating btn-large waves-effect waves-light red' href='#newnote'><i className='material-icons'>note</i></a>
        </div>

        <div id='notes' className='container'>
          <div className='row'>
            {notes}
          </div>
        </div>


          <div id='newnote' className='modal'>
            <div className='modal-content'>
              <h4>New Note</h4>

              <div className='row'>
                <div className='input-field col s12'>
                  <input id='title' type='text' className='validate'></input>
                  <label for='title'>Title</label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input id='content' type='text' className='validate'></input>
                  <label for='content'>Content</label>
                </div>
              </div>

              </div>
              <div className='modal-footer'>
                <a href='#!' className='modal-action modal-close waves-effect waves-green btn-flat' onClick={() => {this.insertNote($('#title').val(), $('#content').val())} }>Add</a>
              </div>


        </div>
      </div>
    )
  }
}

class Note extends React.Component {
  render() {
    return (
        <div className='col s12 m4'>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text'>
              <span className='card-title'>{this.props.title}</span>
              <p>{this.props.content}</p>
            </div>
            <div className='card-action'>
              <a onClick={() => {this.props.edit(this.props.id, 'Update', 'Update'), window.reload()} }>Edit</a>
              <a onClick={() => {this.props.delete(this.props.id), window.reload()} }>Delete</a>
            </div>
          </div>
        </div>
    )
  }
}
