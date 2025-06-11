import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BookDto } from '../../models/book-dto';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class BooksComponent implements OnInit {
  books: BookDto[] = [];
  error = '';
  bookTitle = '';
  author = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<BookDto[]>('https://localhost:7097/api/books').subscribe({
      next: (data) => this.books = data,
      error: (err) => this.error = 'Failed to load books.'
    });
  }  
  
  filteredBooks(): BookDto[] {
    const bookTitle = this.bookTitle.trim().toLowerCase();
    const author = this.author.trim().toLowerCase();
    debugger;
    if (!bookTitle && !author) return this.books;
    const books = this.books.filter(book =>
      book.title.toLowerCase().includes(bookTitle) &&
      book.author.toLowerCase().includes(author));
    return books;
  }
}