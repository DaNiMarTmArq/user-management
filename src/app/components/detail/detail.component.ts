import { Component, effect, inject, Input, signal } from '@angular/core';
import { User } from '../../Interfaces/User';
import { UserService } from '../../services/user.service';
import { lastValueFrom } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { LoadComponent } from '../load/load.component';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';

@Component({
  selector: 'app-detail',
  imports: [RouterModule, LoadComponent, DeletemodalComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  @Input() id: string = '';
  userService = inject(UserService);
  router = inject(Router);
  loading = signal(false);
  user = signal<User | null>(null);
  modal = signal(false);

  async ngOnInit() {
    this.loading.set(true);
    const user = await lastValueFrom(this.userService.getUser(this.id));
    this.user.set(user);
    this.loading.set(false);
  }

  toggleModal() {
    this.modal.set(!this.modal());
  }

  async deleteUser() {
    await lastValueFrom(this.userService.deleteUser(this.user()!._id));
    this.router.navigate(['']);
  }
}
