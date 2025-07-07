import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-success-response-component',
  standalone: true,
  imports: [CommonModule],
  template: `<div *ngIf="successMessage" class="success-message">
              {{ successMessage }}
            </div>`,
  styleUrls: ['./success-response-component.scss']
})
export class SuccessResponseComponent {
  constructor( ) {  }

  @Input() successMessage: string = "";
}
