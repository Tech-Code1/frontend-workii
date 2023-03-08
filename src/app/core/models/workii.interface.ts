import { IUser } from "./user.interface";

export interface IWorkii {
  cost: number,
  description: string,
  executionTime: number,
  id: string;
  name: string,
  slug?: string,
  status?: string,
  target: string,
  timeOfCreation?: number;
  timeOfFinished?: string;
  toDoList: string[],
  applications?: number;
  user: IUser,
}
