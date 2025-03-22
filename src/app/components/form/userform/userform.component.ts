import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { imageUrlValidator } from './urlValidator';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../Interfaces/UserDTO';
import { lastValueFrom } from 'rxjs';

type RouteKey = 'newuser' | 'updateuser';

@Component({
  selector: 'app-userform',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css',
})
export class UserformComponent implements OnInit {
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);

  readonly alertTimeout = 3000;
  formSucess = signal(false);
  formError = signal(false);

  readonly routeFormMeta: Record<RouteKey, { title: string; submit: string }> =
    {
      newuser: { title: 'Nuevo usuario', submit: 'Guardar' },
      updateuser: { title: 'Actualizar usuario', submit: 'Actualizar' },
    };

  formMeta = {
    title: 'Formulario',
    submit: 'Enviar',
  };

  readonly userForm = this.formBuilder.group({
    userName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    image: ['', [Validators.required, imageUrlValidator()]],
  });

  get controls() {
    return this.userForm.controls;
  }

  ngOnInit() {
    this.setFormStateFromRoute();
  }

  async handleSubmit() {
    if (!this.userForm.valid) return;

    const { userName, lastName, email, image } = this.controls;

    const firstNameValue = userName?.value?.trim() ?? '';
    const lastNameValue = lastName?.value?.trim() ?? '';
    const emailValue = email?.value?.trim() ?? '';
    const imageValue = image?.value?.trim() ?? '';

    const user: UserDTO = {
      first_name: firstNameValue,
      last_name: lastNameValue,
      username:
        firstNameValue && lastNameValue
          ? `${firstNameValue}-${lastNameValue}`
          : '',
      email: emailValue,
      image: imageValue,
    };
    try {
      const userResponse = await lastValueFrom(
        this.userService.createUser(user)
      );
      if (userResponse) this.showSucess();
    } catch (error) {
      this.showError();
    } finally {
      this.userForm.reset();
    }
  }

  private setFormStateFromRoute() {
    const route = this.route.snapshot.url[0]?.path;

    if (route && route in this.routeFormMeta) {
      this.formMeta = this.routeFormMeta[route as RouteKey];
    }
  }

  private showError() {
    this.formError.set(true);
    setTimeout(() => this.formError.set(false), this.alertTimeout);
  }

  private showSucess() {
    this.formSucess.set(true);
    setTimeout(() => this.formSucess.set(false), this.alertTimeout);
  }
}
