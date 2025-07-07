import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BooksComponent } from './pages/books/books';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [  
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], 
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'books', component: BooksComponent },
      { path: 'employee-panel', component: BooksComponent, canActivate: [authGuard],  data: { roles: ['Admin', 'Employee'] } },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
