import { Component } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BookAPIServiceService } from '../../services/book-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {

  book: any
  bookId: number;

  bookForm!: FormGroup;

  showIsbnHint!: boolean;


  constructor(private bookAPIService: BookAPIServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) 
  { 
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
  }

  
  ngOnInit(): void{
    console.log("Book to Edit", this.bookId);
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern(/^\d{10}|\d{13}$/)]],
      price: [null, [Validators.required, Validators.min(0)]],
      publishedDate: ['', Validators.required],
      description: ['']
    });


    this.bookAPIService.getBookById(this.bookId).subscribe(book => {
      this.bookForm.patchValue({
        ...book,
        publishedDate: this.formatDate(book.publishedDate)
      });
    });

    console.log("Book to Edit", this.bookForm.value);

  }

  formatDate(date: any): string {
    return new Date(date).toISOString().substring(0, 10); // yyyy-mm-dd
  }

  onSubmit() {
     if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const updatedBook: Book = {
      id: this.bookId,
      ...this.bookForm.value,
      publishedDate: new Date(this.bookForm.value.publishedDate)
    };

    this.bookAPIService.updateBook(updatedBook).subscribe({
      
      next: (res) => {
        this.toastr.success('Book details updated successfully', 'Success', {
        timeOut: 3000,
        closeButton: true,
        positionClass: 'toast-top-right'})
          .onHidden.subscribe(() => {
            this.router.navigate(['/']);
          });
      },
      error: (err) => {
        this.toastr.error('Failed to update book', 'Error', {
          timeOut: 3000,
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      }

    });
  }

  onCancel(){
    this.router.navigate(['/'])
  }
}
