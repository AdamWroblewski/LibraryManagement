import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GeneralErrorComponent } from '../../shared/general-error-component/general-error-component';
import { MatDialogRef } from '@angular/material/dialog';
import { extractApiErrors } from '../../handlers/api-error.util';
import { environment } from '../../../environments/environment';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    GeneralErrorComponent
  ],
  templateUrl: './add-book-modal.html',
  styleUrls: ['./add-book-modal.scss']
})
export class AddBookModalComponent {
  bookForm: FormGroup;
  errorMap: { [key: string]: string } = {};
  apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { },
    public dialogRef: MatDialogRef<AddBookModalComponent>,
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      publisher: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.http.post(`${this.apiUrl}books`, this.bookForm.value).subscribe({
        next: (response) => {
          this.errorMap = {};
          this.dialogRef.close(true); 
        },
        error: (error) => {
          this.errorMap = extractApiErrors(error);
        }
      });
    }
  }
}
