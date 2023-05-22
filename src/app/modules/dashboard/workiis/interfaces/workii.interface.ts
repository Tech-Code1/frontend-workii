import { IUser } from 'src/app/core/models/user.interface';

export interface IWorkiiCreate {
	cost: number;
	description: string;
	executionTime: number | string;
	id?: string;
	name: string;
	slug?: string;
	status?: string;
	target: string;
	timeOfCreation?: number;
	timeOfFinished?: string;
	toDoList: string[];
	applications?: number;
	userId?: string;
}

export interface IPagination {
	limit: number;
	offset: number;
}

export interface IStatus {
	id: number;
	status: string;
}

export interface IApplicationUser {
	id?: string;
	user: IUser;
	workii: IWorkiiApllication;
}

export type TPartialApplication = Partial<IApplicationUser>;

export interface IApplicationCreateUser {
	user: IUser;
	workii: IWorkiiApllication;
}

export interface IApplicationCreateUserDTO {
	userId: string;
	workiiId: string;
}

export interface IWorkiiApllication {
	id: string;
}

export interface IApplicationResponse {
	id?: number;
	ok?: boolean;
	statusCode?: number;
	message: string;
}
export interface IApplication {
	workii: string;
	user: string;
}

export interface IApplyResponse {
	workii: string;
	user: string;
	message?: string;
}

export interface IResponseSuccess {
	message: string;
}

export interface IUsersApplicationResponse {
	id: string;
	user: IUsersApplication;
}

export interface IUsersApplication {
	id: string;
	email: string;
	avatar: string;
	nick: string;
	areaOfExpertise: string[];
	profession: string[];
	isActive: boolean;
	roles: string[];
	timeOfCreation: string;
}

/* export interface ITime {
  id: number,
  time: number
} */

/* export enum Etarget {
  Art = "Arte",
  Computing =  "Informatica",
  Humanities = "Humanidades",
  Sciences = "Ciencias",
  Engineering = "Ingenieria",
  Entertainment = "Entretenimiento",
  Communications = "Comunicaciones",
  Marketing = "Marketing",
  Other =  "Otro"
} */

/* const status: IStatus[] = [
  { id: 1, status: "Busqueda" },
  { id: 2, status: "Eligiendo" },
  { id: 3, status: "Iniciado" },
  { id: 4, status: "Finalizado" }
]; */

/* const time: ITime[] = [3,5,7,10,15]; */
