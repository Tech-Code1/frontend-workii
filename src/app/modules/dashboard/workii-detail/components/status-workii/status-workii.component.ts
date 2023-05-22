import { Component, Input, OnInit } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { IApplicationUser } from '../../../workiis/interfaces/workii.interface';

@Component({
	selector: 'status-workii',
	templateUrl: './status-workii.component.html',
	styleUrls: ['./status-workii.component.scss']
})
export class StatusWorkiiComponent implements OnInit {
	@Input()
	workii!: IWorkii;

	@Input()
	applications!: readonly IApplicationUser[];

	userCurrentId!: string;

	constructor(private userService: UserService) {}

	ngOnInit(): void {
		this.userCurrentId = this.userService.getCurrentUser();
	}
}
