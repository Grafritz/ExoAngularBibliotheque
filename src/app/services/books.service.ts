import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books.slice());
  }

  saveBook() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
    .on('value', (data) => {
      this.books = data.val() ? data.val() : [];
    });
  }

  getSingleBook(id: number) {
    return new Promise(
        (resolve, rejecte) => {
          firebase.database().ref('/books/' + id).once('value').then(
            (data) => {
              resolve(data.val());
            },
            (erreur) => {
              reject(erreur);
            }
          );
        }
    );
  }

}
