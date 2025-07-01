import { Component } from '@angular/core';   
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BookDto } from '../../models/book-dto';

@Component({
  selector: 'app-book-details-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './book-details-modal.html'
})
export class BookDetailsModalComponent {
     constructor(@Inject(MAT_DIALOG_DATA) public data: BookDto) { }
 }