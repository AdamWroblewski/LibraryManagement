import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="dashboard-container">
      <aside class="sidebar" *ngIf="auth.isLoggedIn()">
        <nav>
          <ul>
            <li><a routerLink="/dashboard/home" routerLinkActive="active">Home</a></li>
            <li><a (click)="auth.logout()">Logout</a></li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container { display: flex; min-height: 100vh; }
    .sidebar { width: 200px; background: #2c3e50; color: #fff; padding: 20px 0; }
    .sidebar ul { list-style: none; padding: 0; }
    .sidebar li { margin: 20px 0; }
    .sidebar a { color: #fff; text-decoration: none; padding: 8px 16px; display: block; }
    .sidebar a.active, .sidebar a:hover { background: #34495e; border-radius: 4px; }
    .main-content { flex: 1; padding: 40px; background: #f4f6f8; }
  `]
})
export class DashboardComponent {
  constructor(public auth: AuthService) {}
}
