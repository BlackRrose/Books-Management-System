import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BookListComponent } from "./books/components/book-list/book-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BooksManagment-ui';
}
