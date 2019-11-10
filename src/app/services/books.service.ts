import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
   }

  emitBooks() {
    this.booksSubject.next(this.books); // .slice());
  }

  saveBook() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
    .on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
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
              rejecte(erreur);
            }
          );
        }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBook();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book ) {
          return true;
        }
      }
    );
    this.books.slice(bookIndexToRemove, 1);
    this.saveBook();
    this.emitBooks();
  }

}
