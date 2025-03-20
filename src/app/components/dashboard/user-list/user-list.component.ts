import { Component, input, output } from '@angular/core';
import { User } from '../../../Interfaces/User';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  imports: [UserComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  userList = input<User[]>();
  onDeleteOutput = output<string>({ alias: 'onDelete' });

  onDelete(userId: string) {
    this.onDeleteOutput.emit(userId);
  }
}
