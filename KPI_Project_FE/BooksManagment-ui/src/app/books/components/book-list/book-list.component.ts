import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{

  books: Book[] = [];
  
  
  flippedCardIndex: number | null = null;

  constructor(private bookAPIServies: BookService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.bookAPIServies.getAllBooks().subscribe(data => {
      console.log(data);
      this.books = data
    })
  }

  

  deleteBook(index: number) {
    this.books.splice(index, 1);
  }

  toggleFlip(index: number) {
    // Toggle flip for the clicked card
    this.flippedCardIndex = this.flippedCardIndex === index ? null : index;
  }
}
