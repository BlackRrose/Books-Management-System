import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Book} from '../interfaces/book';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json",
    'Access-Control-Allow-Origin': "*"
  })
}

@Injectable({
  providedIn: 'root'
})


export class BookAPIServiceService {

  
  private readonly baseUrl: string = "https://localhost:7204/api/Books";

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/GetAllBooks`, httpOptions)
  }

  getBookById(bookID: number): Observable<Book>{
    return this.http.get<Book>(`${this.baseUrl}/GetBookById?Id=`+ bookID, httpOptions)
  }

  addBook(bookVM: Book): Observable<Book>{
    return this.http.post<Book>(`${this.baseUrl}/AddBook`, bookVM, httpOptions)
  }

  updateBook(book: Book): Observable<Book>{
    return this.http.put<Book>(`${this.baseUrl}/UpdateBook?Id=`+ book.id, book, httpOptions)
  }

  deleteBook(id: number){
    return this.http.delete(`${this.baseUrl}/DeleteBook?Id=`+ id, httpOptions)
  }

}
