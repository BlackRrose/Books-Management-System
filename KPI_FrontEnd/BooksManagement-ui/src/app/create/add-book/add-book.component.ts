import { Component, OnInit } from '@angular/core';
import { BookAPIServiceService } from '../../services/book-api-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Book } from '../../interfaces/book';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,

  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit{

  bookForm! : FormGroup;

  showIsbnHint!: boolean;

  constructor(private bookAPIService: BookAPIServiceService, private router: Router, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern(/^\d{10}|\d{13}$/)]],
      price: [null, [Validators.required, Validators.min(0)]],
      publishedDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  cancel() {
    this.router.navigate(['/'])
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const newBook: Book = {
      ...this.bookForm.value,
      publishedDate: new Date(this.bookForm.value.publishedDate)
    };

    this.bookAPIService.addBook(newBook).subscribe({

      next: (res) => {
        this.toastr.success('Book added successfully', 'Success', {
        timeOut: 3000,
        closeButton: true,
        positionClass: 'toast-top-right'})
          .onHidden.subscribe(() => {
            this.router.navigate(['/']);
          });
      },
      error: (err) => {
        this.toastr.error('Failed to add book', 'Error', {
          timeOut: 3000,
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      }

    })
  }

}
