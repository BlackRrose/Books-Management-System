import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../interfaces/book';
import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-update-book',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, CommonModule, ReactiveFormsModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent implements OnInit {

  bookForm!: FormGroup;
  bookId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern(/^\d{10}|\d{13}$/)]],
      price: [null, [Validators.required, Validators.min(0)]],
      publishedDate: ['', Validators.required],
      description: ['']
    });

    this.bookService.getBookById(this.bookId).subscribe(book => {
      this.bookForm.patchValue({
        ...book,
        publishedDate: this.formatDate(book.publishedDate)
      });
    });
  }

  formatDate(date: any): string {
    return new Date(date).toISOString().substring(0, 10); // yyyy-mm-dd
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }


  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const updatedBook: Book = {
      id: this.bookId,
      ...this.bookForm.value,
      publishedDate: new Date(this.bookForm.value.publishedDate)
    };

    this.bookService.updateBook(updatedBook).subscribe({
      next: () => this.router.navigate(['/books']),
      error: (err) => console.error('Update failed:', err)
    });
  }

  onCancel(){
    this.router.navigate(['/books'])
  }
}
