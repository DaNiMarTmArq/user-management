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
  deleteUserOutput = output<string>({ alias: 'delete' });
  detailUserOutput = output<string>({ alias: 'detail' });
  public get fullname() {
    return `${this.user()!.first_name} ${this.user()!.last_name}`;
  }
  public get userId(): string {
    return this.user()!._id;
  }

  onDelete() {
    this.deleteUserOutput.emit(this.userId);
  }
  onDetail() {
    this.detailUserOutput.emit(this.userId);
  }
}
