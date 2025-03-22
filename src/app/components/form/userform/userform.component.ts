import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
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
export class UserformComponent implements OnInit {
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

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
    this.setFormMetaFromRoute();
  }

  handleSubmit() {
    console.log(this.userForm.value);
  }

  private setFormMetaFromRoute() {
    const route = this.route.snapshot.url[0]?.path;

    if (route && route in this.routeFormMeta) {
      this.formMeta = this.routeFormMeta[route as RouteKey];
    }
  }
}
