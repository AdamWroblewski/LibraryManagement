import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal';

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

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.http.get<BookDto[]>('https://localhost:7097/api/books').subscribe({
      next: (data) => this.books = data,
      error: (err) => this.error = 'Failed to load books.'
    });
  }  

  openDetails(book: BookDto) {
    this.http.get<ActiveBookLoanDto[]>('https://localhost:7097/api/bookloans/activeloans/' + book.id).subscribe({
      next: (activeLoan) => {
        this.dialog.open(BookDetailsModalComponent, {
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
}