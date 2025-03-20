import { Component, input, output } from '@angular/core';
import { User } from '../../../Interfaces/User';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = input<User>();
  deleteUserOutout = output<string>({ alias: 'delete' });
  public get fullname() {
    return `${this.user()!.first_name} ${this.user()!.last_name}`;
  }
  onDelete() {
    this.deleteUserOutout.emit(this.user()!._id);
  }
}
