export interface IWorkii {

    name: string,
    target: string[],
    description: string,
    toDoList: string[],
    cost: number,
    slug?: string,
    status?: string,
    userId: string,
    executionTime: number,
}

export interface IStatus {
  id: number,
  status: string
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

