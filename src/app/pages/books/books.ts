import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal';
import { AddBookModalComponent } from '../add-book-modal-component/add-book-modal';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

import { BookDto } from '../../models/book-dto';
import { ActiveBookLoanDto } from '../../models/active-book-loan-dto';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    MatDialogModule,
  ],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class BooksComponent implements OnInit {
  books: BookDto[] = [];
  error = '';
  bookTitle = '';
  author = '';

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void {
    this.http.get<BookDto[]>(`${this.apiUrl}` + 'books').subscribe({
      next: (data) => this.books = data,
      error: (err) => this.error = 'Failed to load books.'
    });
  }  

  openDetails(book: BookDto) {
    this.http.get<ActiveBookLoanDto[]>(`${this.apiUrl}` + 'bookloans/activeloans/' + book.id).subscribe({
      next: (activeLoan) => {
        this.dialog.open(BookDetailsModalComponent, {
          width: '560px',
          data: { book, activeLoan }
        });
      },
      error: (err) => this.error = 'Failed to load books.'
    });
  }

  filteredBooks(): BookDto[] {
    const bookTitle = this.bookTitle.trim().toLowerCase();
    const author = this.author.trim().toLowerCase();

    if (!bookTitle && !author) return this.books;
    const books = this.books.filter(book =>
      book.title.toLowerCase().includes(bookTitle) &&
      book.author.toLowerCase().includes(author));
    return books;
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookModalComponent, {
      width: '500px',
      // można przekazać dodatkowe dane, jeśli potrzebne
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Odśwież listę książek, jeśli nowa została dodana
        this.ngOnInit();
      }
    });
  }
}