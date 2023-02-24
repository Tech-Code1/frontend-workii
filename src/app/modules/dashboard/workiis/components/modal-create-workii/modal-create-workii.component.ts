import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';

@Component({
  selector: 'modal-create-workii',
  templateUrl: './modal-create-workii.component.html',
  styleUrls: ['./modal-create-workii.component.scss']
})
export class ModalCreateWorkiiComponent {

  @ViewChild('taskInput', {static: true}) taskInput!: ElementRef<HTMLInputElement>;
  initialValue: string = "";
  inputChanged = false;

  changeEmail!: FormGroup;
  createWorkii:FormGroup  = this.formBuilder.group({
    cost: ["", [Validators.required]],
    target: ["", [Validators.required]],
    time: ["", [Validators.required]],
    description: ["", [Validators.required]],
    tasks: [[], [Validators.required]],
  })

  constructor(
    private modalService: SwitchService,
    private formBuilder: FormBuilder, ) {}


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

  deleteInput(input: HTMLInputElement, button: HTMLButtonElement, content: HTMLDivElement) {
    const parent = content.parentNode
    if(parent) {
      parent.removeChild(content)
    }
  }

  addInput() {
    const content = document.createElement('div')
    content.classList.add('flex', 'gap-2', 'flex-row')
    this.taskInput.nativeElement.appendChild(content);

    const addInput = document.createElement('input');
    addInput.type = 'text';
    addInput.classList.add('input-standard', 'rounded-md', 'w-full')
    addInput.placeholder = 'Especifica que quieres que haga exactamente'
    content.appendChild(addInput)

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('h-10', 'btn-light-red', 'rounded-md', 'w-10', 'p-0', 'flex', 'justify-center', 'items-center', 'border-0', 'bg-transparent', 'hover:bg-error-redLight', 'hover:border-2', 'hover:border-error-redDark')
    deleteButton.addEventListener('click', () => this.deleteInput(addInput, deleteButton, content))
    content.appendChild(deleteButton)

    const iconButton = document.createElement('img')
    iconButton.src = '../../../../../../assets/images/svg/icon-trash.svg'
    iconButton.classList.add('size-svg')
    deleteButton.appendChild(iconButton)
  }
}
