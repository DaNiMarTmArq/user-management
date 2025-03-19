import { Component, inject } from '@angular/core';
import { UserComponent } from './user/user/user.component';
import { User } from '../../Interfaces/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [UserComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  userList: User[] = [];
  currentPage = 0;
  userService = inject(UserService);

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (list) => this.handleUserResponse(list),
      error: (error) => {
        console.log(error);
      },
    });
  }

  private handleUserResponse(list: User[]) {
    this.userList = list;
  }
}
