import { Component } from '@angular/core';
import { BookAPIServiceService } from '../../services/book-api-service.service';
import { Book } from '../../interfaces/book';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

  constructor(private bookAPIService: BookAPIServiceService, private route: ActivatedRoute, private toastr: ToastrService) { }
  
  isFlipped = false;
  books: Book[] = []

  ngOnInit(): void {
    // this.bookAPIService.getAllBooks().subscribe(data => {
    //   this.books = data
    //   console.log(this.books);
    // })
    this.loadBooks();

  }

  loadBooks() {
        this.books = this.route.snapshot.data['books'] /* uses a resolver service, kinda like a async middle man, 
                                                    to allow data to be fetched (prefetch) before loading the screen*/
  }

  flipCard(index: number) {
    this.books[index].isFlipped = !this.books[index].isFlipped;
  }


  deleteBook(id: number) {
    console.log('Confirm delete for book ID:', id);
    this.bookAPIService.deleteBook(id).subscribe((res:any) => {

      this.toastr.success(res.message, 'Deleted', {
        timeOut: 3000,
        closeButton: true,
        positionClass: 'toast-top-right'
      })
      .onHidden.subscribe(() => {
        window.location.reload();
      });      

    });
  }

}
