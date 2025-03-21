import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type RouteKey = 'newuser' | 'updateuser';

@Component({
  selector: 'app-userform',
  imports: [],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent {
  route = inject(ActivatedRoute);
  formMeta = {
    title: 'Formulario',
    submit: 'Enviar'
  }
  


  readonly routeFormMeta: Record<RouteKey, { title: string; submit: string }> = {
    newuser: { title: 'Nuevo usuario', submit: 'Guardar' },
    updateuser: { title: 'Actualizar usuario', submit: 'Actualizar' }
  };

 ngOnInit() {
    const route = this.route.snapshot.url[0]?.path;

    if (route && (route in this.routeFormMeta)) {
      this.formMeta = this.routeFormMeta[route as RouteKey];
    }
  }
}