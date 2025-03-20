import { Component, effect, inject, Input, signal } from '@angular/core';
import { User } from '../../Interfaces/User';
import { UserService } from '../../services/user.service';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { LoadComponent } from '../load/load.component';

@Component({
  selector: 'app-detail',
  imports: [RouterModule, LoadComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  userService = inject(UserService);
  loading = signal(false);
  user = signal<User | null>(null);
  @Input() id: string = '';

  async ngOnInit() {
    this.loading.set(true);
    const user = await lastValueFrom(this.userService.getUser(this.id));
    this.user.set(user);
    this.loading.set(false);
  }
}
