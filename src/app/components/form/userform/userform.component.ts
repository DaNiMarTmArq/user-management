import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { imageUrlValidator } from './urlValidator';

type RouteKey = 'newuser' | 'updateuser';

@Component({
  selector: 'app-userform',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css',
})
export class UserformComponent {
  route = inject(ActivatedRoute);

  readonly routeFormMeta: Record<RouteKey, { title: string; submit: string }> =
    {
      newuser: { title: 'Nuevo usuario', submit: 'Guardar' },
      updateuser: { title: 'Actualizar usuario', submit: 'Actualizar' },
    };
  formMeta = {
    title: 'Formulario',
    submit: 'Enviar',
  };
  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl('', [Validators.required, imageUrlValidator()]),
  });

  ngOnInit() {
    const route = this.route.snapshot.url[0]?.path;

    if (route && route in this.routeFormMeta) {
      this.formMeta = this.routeFormMeta[route as RouteKey];
    }
  }

  handleSubmit() {
    console.log(this.userForm.value);
  }

  get userName() {
    return this.userForm.get('userName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get image() {
    return this.userForm.get('image');
  }
}
