import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { last } from 'rxjs';

type RouteKey = 'newuser' | 'updateuser';

@Component({
  selector: 'app-userform',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent {
  route = inject(ActivatedRoute);
 
  readonly routeFormMeta: Record<RouteKey, { title: string; submit: string }> = {
    newuser: { title: 'Nuevo usuario', submit: 'Guardar' },
    updateuser: { title: 'Actualizar usuario', submit: 'Actualizar' }
  };
  formMeta = {
    title: 'Formulario',
    submit: 'Enviar'
  }
  userForm = new FormGroup({
    userName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    image: new FormControl(''),
  })
  
 ngOnInit() {
    const route = this.route.snapshot.url[0]?.path;

    if (route && (route in this.routeFormMeta)) {
      this.formMeta = this.routeFormMeta[route as RouteKey];
    }

  }

  handleSubmit() {
    console.log(this.userForm.value);
  }
}