import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Store } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiActions } from '../../state/actions/workii.actions';
import { IAppState } from 'src/app/core/state/app.state';

@Component({
	selector: 'modal-create-workii',
	templateUrl: './modal-create-workii.component.html',
	styleUrls: ['./modal-create-workii.component.scss']
})
export class ModalCreateWorkiiComponent implements OnInit {
	@ViewChild('taskInput', { static: true }) taskInput!: ElementRef<HTMLInputElement>;
	initialValue: string = '';
	inputChanged = false;
	targets = [
		'Arte',
		'Informatica',
		'Humanidades',
		'Ciencias',
		'Ingenieria',
		'Entretenimiento',
		'Comunicaciones',
		'Marketing',
		'Otro'
	];
	executionTimes: number[] = [3, 5, 7, 10, 15];
	createWorkii!: FormGroup;
	changeEmail!: FormGroup;

	constructor(
		private modalService: SwitchService,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private store: Store<IAppState>
	) {}

	ngOnInit(): void {
		this.createWorkii = this.formBuilder.group({
			name: ['', [Validators.required]],
			cost: ['', [Validators.required]],
			target: ['', [Validators.required]],
			time: ['', [Validators.required]],

			description: ['', [Validators.required]],
			tasks: this.formBuilder.array([this.formBuilder.control('', Validators.required)], [Validators.required])
		});
	}

	get tasksArr() {
		return this.createWorkii.get('tasks') as FormArray;
	}

	closeModal() {
		this.modalService.$modal.emit(false);
	}

	stopPropagation(event: Event) {
		event.stopPropagation();
	}

	isValid(inputName: string): boolean | undefined | void {
		if (this.createWorkii.get(inputName)?.touched) {
			return this.createWorkii.get(inputName)?.valid;
		}
		return true;
	}

	isValidArray(i: number): boolean | undefined | void {
		if (this.tasksArr.controls[i]?.touched) {
			return this.tasksArr.controls[i].valid;
		}
		return true;
	}

	deleteInput(i: number) {
		this.tasksArr.removeAt(i);
	}

	addInput() {
		this.tasksArr.push(this.formBuilder.control('', [Validators.required]));
	}

	async createNewWorkii() {
		const userId = await this.userService.getCurrentUser();

		const newWorkii = {
			name: this.createWorkii.get('name')?.value,
			cost: parseInt(this.createWorkii.get('cost')?.value),
			target: this.createWorkii.get('target')?.value,
			executionTime: parseInt(this.createWorkii.get('time')?.value),
			description: this.createWorkii.get('description')?.value,
			toDoList: this.createWorkii.get('tasks')?.value,
			userId: userId
		};

		console.log(newWorkii.executionTime);

		this.store.dispatch(WorkiiActions.createWorkiiSuccess(newWorkii));
	}
}
