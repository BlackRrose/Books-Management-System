import { Injectable } from '@angular/core';
import { BookAPIServiceService } from './book-api-service.service';
import {  Resolve } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService implements Resolve<any> {

  constructor(private bookAPIService: BookAPIServiceService, ) { }

  resolve() {
    return this.bookAPIService.getAllBooks().pipe(map(books => books))
  }
}
