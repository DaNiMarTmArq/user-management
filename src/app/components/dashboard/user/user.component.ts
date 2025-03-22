import { Component, inject, input, output, signal } from '@angular/core';
import { User } from '../../../Interfaces/User';
import { DeletemodalComponent } from '../../deletemodal/deletemodal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [DeletemodalComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = input<User>();
  modal = signal(false);
  router = inject(Router);
  deleteUserOutput = output<string>({ alias: 'delete' });
  detailUserOutput = output<string>({ alias: 'detail' });
  public get fullname() {
    return `${this.user()!.first_name} ${this.user()!.last_name}`;
  }
  public get userId(): string {
    return this.user()!._id;
  }
  onUpdate() {
    this.router.navigate(['updateuser', this.user()?._id]);
  }

  onDelete() {
    this.deleteUserOutput.emit(this.userId);
    this.toggleModal();
  }
  onDetail() {
    this.detailUserOutput.emit(this.userId);
  }

  toggleModal() {
    this.modal.set(!this.modal());
  }
}
