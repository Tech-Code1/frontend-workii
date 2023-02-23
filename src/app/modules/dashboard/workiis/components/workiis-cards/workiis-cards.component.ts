import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IWorkii } from '../../interfaces/workii.interface';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss']
})
export class WorkiisCardsComponent {

  workiis: IWorkii[] = [
    {
      name: "Hacer un diseño web",
      target: ["Arte"],
      description: "El diseño web debe ser bonito",
      toDoList: ["Debe tener un formulario para que el cliente se contacte", "La web debe tener un logo"],
      cost: 100,
      slug: "sadsa.dsds.http",
      status: "Busqueda",
      userId: "12ed96a4-2f1f-494b-a491-7d3ee161291f",
      executionTime: 3,
    },
    {
      name: "Hacer un diseño web",
      target: ["Arte"],
      description: "El diseño web debe ser bonito",
      toDoList: ["Debe tener un formulario para que el cliente se contacte", "La web debe tener un logo"],
      cost: 100,
      slug: "sadsa.dsds.http",
      status: "Busqueda",
      userId: "12ed96a4-2f1f-494b-a491-7d3ee161291f",
      executionTime: 3,
    },
    {
      name: "Hacer un diseño web",
      target: ["Arte"],
      description: "El diseño web debe ser bonito",
      toDoList: ["Debe tener un formulario para que el cliente se contacte", "La web debe tener un logo"],
      cost: 100,
      slug: "sadsa.dsds.http",
      status: "Busqueda",
      userId: "12ed96a4-2f1f-494b-a491-7d3ee161291f",
      executionTime: 3,
    },
    {
      name: "Hacer un diseño web",
      target: ["Arte"],
      description: "El diseño web debe ser bonito",
      toDoList: ["Debe tener un formulario para que el cliente se contacte", "La web debe tener un logo"],
      cost: 100,
      slug: "sadsa.dsds.http",
      status: "Busqueda",
      userId: "12ed96a4-2f1f-494b-a491-7d3ee161291f",
      executionTime: 3,
    },
    {
      name: "Hacer un diseño web",
      target: ["Arte"],
      description: "El diseño web debe ser bonito",
      toDoList: ["Debe tener un formulario para que el cliente se contacte", "La web debe tener un logo"],
      cost: 100,
      slug: "sadsa.dsds.http",
      status: "Busqueda",
      userId: "12ed96a4-2f1f-494b-a491-7d3ee161291f",
      executionTime: 3,
    },
    {
      name: "Hacer un diseño web",
      target: ["Arte"],
      description: "El diseño web debe ser bonito",
      toDoList: ["Debe tener un formulario para que el cliente se contacte", "La web debe tener un logo"],
      cost: 100,
      slug: "sadsa.dsds.http",
      status: "Busqueda",
      userId: "12ed96a4-2f1f-494b-a491-7d3ee161291f",
      executionTime: 3,
    },
  ]

  constructor() {}

}
