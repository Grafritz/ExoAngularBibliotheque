import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDNDLGdMP8IUvyHNKOhJ0uuq0Kg0mQFi5c',
      authDomain: 'exoangularbibliotheque.firebaseapp.com',
      databaseURL: 'https://exoangularbibliotheque.firebaseio.com',
      projectId: 'exoangularbibliotheque',
      storageBucket: 'exoangularbibliotheque.appspot.com',
      messagingSenderId: '929960927415',
      appId: '1:929960927415:web:56576355378f897b7ead32',
      measurementId: 'G-Z29PQHD70Z'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
  }
}
