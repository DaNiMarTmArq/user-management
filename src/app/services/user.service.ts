import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_BASE } from '../config';
import { User } from '../Interfaces/User';
import { UserDTO } from '../Interfaces/UserDTO';
import { UserPaginatedResponse } from '../Interfaces/UserResponses';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private client = inject(HttpClient);
  private readonly baseEndpoint = `${API_BASE}/users`;
  constructor() {}

  getAll(params?: Record<string, string>): Observable<UserPaginatedResponse> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.client.get<UserPaginatedResponse>(this.baseEndpoint, {
      params: httpParams,
    });
  }

  getUser(userId: string): Observable<User> {
    return this.client.get<User>(`${this.baseEndpoint}/${userId}`);
  }

  createUser(newUser: UserDTO): Observable<User> {
    return this.client.post<User>(this.baseEndpoint, newUser);
  }

  updateUser(userId: string, updateData: UserDTO): Observable<User> {
    return this.client.put<User>(`${this.baseEndpoint}/${userId}`, updateData);
  }

  deleteUser(userId: string): Observable<User> {
    return this.client.delete<User>(`${this.baseEndpoint}/${userId}`);
  }
}
