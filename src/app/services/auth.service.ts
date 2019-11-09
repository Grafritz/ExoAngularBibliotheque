import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            resolve();
          },
          (erreur) => {
            reject(erreur);
          }
        );
      }
    );
  }
  signInUser(email: string, password: string) {
    return new Promise((resolve, rejecte ) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => { resolve(); },
        (erreur) => { rejecte(erreur); }
      );
    });
  }
  siOutUser() {
    firebase.auth().signOut();
  }

}
