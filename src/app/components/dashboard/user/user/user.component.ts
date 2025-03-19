import { Component, input } from '@angular/core';
import { User } from '../../../../Interfaces/User';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = input<User>();
  public get fullname() {
    return `${this.user()!.first_name} ${this.user()!.last_name}`;
  }
}
