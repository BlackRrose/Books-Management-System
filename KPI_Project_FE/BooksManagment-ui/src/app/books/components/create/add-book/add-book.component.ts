import { Component, OnInit } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-add-book',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  
  // Toast flags
  showSuccessToast = false;
  showErrorToast = false;

    constructor(private fb: FormBuilder, private apiService: BookService, private route: Router) {}

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

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    console.log('Form submitted:', this.bookForm.value);


    const newBook: Book = {
      ...this.bookForm.value,
      publishedDate: new Date(this.bookForm.value.publishedDate)
    };

    this.apiService.addBook(newBook).subscribe({
      next: (data) => {
        this.showSuccessToast = true;
        this.bookForm.reset(); // Optional
        setTimeout(() => (this.showSuccessToast = false), 3000);
        this.route.navigate(['/books'])
      },
      error: (err) => {
        console.error('Error:', err);
        this.showErrorToast = true;
        setTimeout(() => (this.showErrorToast = false), 3000);
      }
    })
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onCancel(){
    this.route.navigate(['/books'])
  }

}
