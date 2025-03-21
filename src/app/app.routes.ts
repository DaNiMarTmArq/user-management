import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailComponent } from './components/detail/detail.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserformComponent } from './components/form/userform/userform.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent, title: 'Dashboard' },
  { path: 'user/:id', component: DetailComponent, title: 'User detail' },
  { path: 'newuser', component: UserformComponent, title: 'New user' },
  { path: '**', component: NotfoundComponent, title: 'Not found' },
];
