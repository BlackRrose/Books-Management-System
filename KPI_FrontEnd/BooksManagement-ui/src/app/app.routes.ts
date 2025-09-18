import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddBookComponent } from './create/add-book/add-book.component';
import { EditBookComponent } from './update/edit-book/edit-book.component';
import { BookListComponent } from './book-list/book-list/book-list.component';
import { BooksResolverService } from './services/books-resolver.service';

export const routes: Routes = [
    {path: '', component: BookListComponent, resolve: {books: BooksResolverService}},
    {path: 'Home', component: BookListComponent, resolve: {books: BooksResolverService}},
    {path: 'books/add', component: AddBookComponent},
    {path: 'books/edit/:id', component: EditBookComponent}
];
