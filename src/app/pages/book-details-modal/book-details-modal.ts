import { Component } from '@angular/core';   
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { extractApiErrors } from '../../handlers/api-error.util';
import { HttpClient } from '@angular/common/http';
import { GeneralErrorComponent } from '../../shared/general-error-component/general-error-component';
import { SuccessResponseComponent } from '../../shared/success-response-component/general-error-component';
import { Response } from '../../models/response-dto';

import { BookDto } from '../../models/book-dto';
import { ActiveBookLoanDto } from '../../models/active-book-loan-dto';

@Component({
  selector: 'app-book-details-modal',
  standalone: true,
  imports: [
    MatDialogModule, 
    CommonModule, 
    GeneralErrorComponent, 
    SuccessResponseComponent
  ],
  templateUrl: './book-details-modal.html',
  styleUrl: './book-details-modal.scss'
})
export class BookDetailsModalComponent {
  errorMap: { [key: string]: string } = {};
  successMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { book: BookDto, activeLoan: ActiveBookLoanDto },
    private http: HttpClient) {
      if (data.activeLoan != null) {
        this.successMessage = "zxc";
      }
    }


  onSubmit(id: number) {
    const bookReservationCommand = { bookId: id }
    
    this.http.post<Response>('https://localhost:7097/api/bookloans', bookReservationCommand).subscribe({
      next: (response) => {
        this.errorMap = {};
        this.successMessage = response.successMessage;
      },
      error: (error) => {
        this.errorMap = extractApiErrors(error);
      }
    });
  }
}