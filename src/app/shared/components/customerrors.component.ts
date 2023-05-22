import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Component({
	selector: 'custom-errors-message',
	template: `
		<span>
			<div class="w-full rounded-md h-auto p-1 gap-2 items-center flex">
				<img class="h-4 w-4" src="../../../../assets/images/svg/icon-error.svg" alt="icon error" />
				{{ listOfErrors() }}
			</div>
		</span>
	`
})
export class CustomErrorsComponent {
	@Input()
	public formGroup!: AbstractControl;

	@Input()
	public controlName!: string;

	listErrors!: string[] | null | void;

	private static readonly errorMessages: any = {
		required: (booleanValue?: any, controlName?: any) => `El campo es requerido`,
		minlength: (booleanValue: { requiredLength: any }, controlName?: any) =>
			`El campo debe tener minimo ${booleanValue.requiredLength} caracteres.`,
		maxlength: (booleanValue: { requiredLength: any }, controlName?: any) =>
			`EL campo debe tener máximo ${booleanValue.requiredLength} caracteres.`,
		pattern: (booleanValue?: any, controlName?: any) => `El campo no tiene un formato valido.`,
		noSimilar: (booleanValue?: any, controlName?: any) => `La contraseña debe ser igual.`
	};

	listOfErrors(): string[] {
		return Object.keys(this.formGroup.get(this.controlName)?.errors!).map((field) =>
			this.getMessage(field, this.formGroup.get(this.controlName)?.errors![field], this.controlName)
		);
	}

	private getMessage(errorName: string, booleanValue?: any, controlName?: string) {
		return CustomErrorsComponent.errorMessages[errorName](booleanValue, controlName);
	}
}
