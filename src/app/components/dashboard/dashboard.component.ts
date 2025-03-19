import { Component } from '@angular/core';
import { UserComponent } from './user/user/user.component';

@Component({
  selector: 'app-dashboard',
  imports: [UserComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
