import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  roles: string[] = [];

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.roles = this.authService.getUserRoles();
  }
}
