import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Interfaces/User';
import { UserPaginatedResponse } from '../../Interfaces/UserResponses';
import { HttpErrorResponse } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoadComponent } from '../load/load.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [UserListComponent, LoadComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  placeholders = [...Array(6).keys()];
  userList: User[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  error = false;
  userService = inject(UserService);
  router = inject(Router);

  ngOnInit() {
    this.fetchUsers(this.currentPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.fetchUsers(this.currentPage + 1);
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.fetchUsers(this.currentPage - 1);
    }
  }

  handleDetail(userId: string) {
    this.router.navigate(['user', userId]);
  }

  handleDelete(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: () =>
        (this.userList = this.userList.filter((user) => user._id !== userId)),
      error: (err) => this.handleServiceError(err),
    });
  }

  private fetchUsers(page: number) {
    this.loading = true;
    this.userService.getAll({ page: page.toString() }).subscribe({
      next: (response) => this.handleUserResponse(response),
      error: (error) => this.handleServiceError(error),
    });
  }

  private handleUserResponse(response: UserPaginatedResponse) {
    this.userList = response.results;
    this.currentPage = response.page;
    this.totalPages = response.total_pages;
    this.loading = false;
  }

  private handleServiceError(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      console.error(`HTTP Error: ${error.status} - ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
    }
    this.error = true;
    this.loading = false;
  }
}
