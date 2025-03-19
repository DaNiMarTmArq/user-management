import { Component, inject } from '@angular/core';
import { UserComponent } from './user/user/user.component';
import { User } from '../../Interfaces/User';
import { UserService } from '../../services/user.service';
import { UserPaginatedResponse } from '../../Interfaces/UserResponses';

@Component({
  selector: 'app-dashboard',
  imports: [UserComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  userList: User[] = [];
  currentPage = 1;
  totalPages = 1;
  error = false;
  userService = inject(UserService);

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (response) => this.handleUserResponse(response),
      error: (error) => {},
    });
  }

  nextPage() {
    const nextPage: Record<string, string> = {
      page: (this.currentPage + 1).toString(),
    };
    this.userService.getAll(nextPage).subscribe({
      next: (response) => this.handleUserResponse(response),
      error: (error) => this.handleServiceError(error),
    });
  }
  previousPage() {
    const previousPage: Record<string, string> = {
      page: (this.currentPage - 1).toString(),
    };
    this.userService.getAll(previousPage).subscribe({
      next: (response) => this.handleUserResponse(response),
      error: (error) => this.handleServiceError(error),
    });
  }

  private handleUserResponse(response: UserPaginatedResponse) {
    this.userList = response.results;
    this.currentPage = response.page;
    this.totalPages = response.total_pages;
  }

  private handleServiceError(error: any) {
    console.log(error);
    this.error = true;
  }
}
