import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AbstractFormGroupDirective, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { WorkiisService } from '../../service/workiis.service';
import { IWorkiiCreate } from '../../interfaces/workii.interface';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { validate as uuidValidate } from 'uuid';
import { Store } from '@ngrx/store';
//import { createWorkii } from '../../state/actions/workii.actions';
import { IWorkii } from 'src/app/core/models/workii.interface';

@Component({
  selector: 'modal-create-workii',
  templateUrl: './modal-create-workii.component.html',
  styleUrls: ['./modal-create-workii.component.scss']
})
export class ModalCreateWorkiiComponent implements OnInit {

  @Input()
  isApply!: string[];

  @ViewChild('taskInput', {static: true}) taskInput!: ElementRef<HTMLInputElement>;
  initialValue: string = "";
  inputChanged = false;
  targets = ['Arte', 'Informatica', 'Humanidades', 'Ciencias', 'Ingenieria', 'Entretenimiento', 'Comunicaciones', 'Marketing', 'Otro']
  executionTimes: number[] = [3,5,7,10,15]
  createWorkii!: FormGroup;
  changeEmail!: FormGroup;


  constructor(
    private modalService: SwitchService,
    private formBuilder: FormBuilder,
    private workiisService: WorkiisService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<IWorkii> ) {
    }

    ngOnInit(): void {
      this.createWorkii = this.formBuilder.group({
        name: ["", [Validators.required]],
        cost: ["", [Validators.required]],
        target: ["", [Validators.required]],
        time: [ '', [Validators.required]],
        description: ["", [Validators.required]],
        tasks: this.formBuilder.array([
          this.formBuilder.control('', Validators.required),
        ], [Validators.required]),
      })

    }

    get tasksArr() {

      return this.createWorkii.get("tasks") as FormArray;
    }

  closeModal() {
    this.modalService.$modal.emit(false)
  }

  stopPropagation (event: Event) {
    event.stopPropagation();
  }

  isValid(inputName: string): boolean | undefined | void {
    if (this.createWorkii.get(inputName)?.touched) {

      return this.createWorkii.get(inputName)?.valid
    }
    return true
  }

  isValidArray(i: number): boolean | undefined | void {

    if (this.tasksArr.controls[i]?.touched) {

      return this.tasksArr.controls[i].valid
    }
    return true
  }

  deleteInput(i: number) {
     this.tasksArr.removeAt(i)
  }

  addInput() {
    this.tasksArr.push( this.formBuilder.control('', [Validators.required]));
  }

  async createNewWorkii() {
    //this.store.dispatch(createWorkii())
    const userId = await this.userService.getCurrentUser()

    // Obtener el token de autorización
    const token = localStorage.getItem('token');

    // Crear el encabezado de la solicitud HTTP
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const newWorkii: IWorkiiCreate = {
      name: this.createWorkii.get('name')?.value,
      cost: parseInt(this.createWorkii.get('cost')?.value),
      target: this.createWorkii.get('target')?.value,
      executionTime: parseInt(this.createWorkii.get('time')?.value),
      description: this.createWorkii.get('description')?.value,
      toDoList: this.createWorkii.get('tasks')?.value,
      userId: userId
    }

    this.workiisService.createWorkiis( newWorkii, headers ).subscribe({
      next: (createdWorkii: IWorkii) => {
        console.log(createdWorkii);
        location.reload();
        this.closeModal();
        Swal.fire('Se ha creado el workii correctamente');
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error',`No se ha podido crear el workii correctamente`,'error');
      }
    })
  }


}
