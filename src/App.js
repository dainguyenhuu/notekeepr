import React from 'react';
import firebase from 'firebase/app';
import Access from './component/Access';
import Notes from './component/Notes';
import * as conf from './component/Config';

import {$,jQuery} from 'jquery';

export default class App extends React.Component {

  constructor() {
    super();
    firebase.initializeApp(conf.config);
    this.state = {
      user: null,
      notes: []
    }
  }

  setNotes(notes) {
     this.setState({
       notes: notes
     })
  }

  render() {
    const that = this;
    const user = this.state.user;
    let app;

    firebase.auth().onAuthStateChanged(function(user) {
      let notes = [];
      let id = 0;
      if (user) {
        if (that.state.user === null) {
          var uid = firebase.auth().currentUser.uid;
          firebase.database().ref('/notes/' + uid).once('value').then(function(snapshot) {

              that.setState({
                user: user,
                notes: snapshot,
                id: id
              });

          });
        }
      } else {
        if (that.state.user != null) {
          that.setState({user: null});
        }
      }
    });

    if (user) {
      app = <Notes notes={that.state.notes} setNotes={that.setNotes}/>
    } else {
      app = <Access />
    }

    return (
      <div>
          {app}
      </div>
    );
  }
};
