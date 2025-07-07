import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-general-error-component',
  standalone: true,
  imports: [CommonModule],
  template: `<div *ngIf="errorMap['general error']" class="error-list">
              {{ errorMap['general error'] }}
            </div>`,
  styleUrls: ['./general-error-component.scss']
})
export class GeneralErrorComponent {
  constructor( ) {  }

  @Input() errorMap: { [key: string]: string } = {};
}
