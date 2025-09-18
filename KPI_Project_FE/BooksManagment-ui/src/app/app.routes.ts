import { Routes } from '@angular/router';
import { BookListComponent } from './books/components/book-list/book-list.component';
import { AddBookComponent } from './books/components/create/add-book/add-book.component';
import { UpdateBookComponent } from './books/components/update/update-book/update-book.component';

export const routes: Routes = [
    {path: '', redirectTo: 'books', pathMatch:'full'},
    {path: 'books', component: BookListComponent},
    {path: 'books/add', component: AddBookComponent},
    {path: 'books/update/:id', component: UpdateBookComponent}

];
