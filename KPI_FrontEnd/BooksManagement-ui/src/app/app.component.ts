import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookAPIServiceService } from './services/book-api-service.service';
import { Book } from './interfaces/book';
import { BookListComponent } from "./book-list/book-list/book-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, /*BookListComponent*/ RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BooksManagement-ui';
  isFlipped = false;
  books: Book[] = []

  constructor(private bookAPIService: BookAPIServiceService) { }
  

  booksDummy = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      price: 10.99,
      publishedDate: new Date('1925-04-10'),
      description: 'A novel about the American dream, love, and tragedy set in the 1920s.',
      isFlipped: false
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      price: 8.99,
      publishedDate: new Date('1949-06-08'),
      description: 'A dystopian novel about surveillance and totalitarianism.',
      isFlipped: false
    }
    // Add more books as needed
  ];

}
