import { IWorkii } from "./workii.interface";
import { IApplicationUser, IUsersApplicationResponse } from '../../modules/dashboard/workiis/interfaces/workii.interface';
export interface IWorkiiState {
  workiis: ReadonlyArray<IWorkii>;
  applications: ReadonlyArray<IApplicationUser>;
  getWorkii: IWorkii | null;
  getUsersWorkiiApply: readonly IUsersApplicationResponse[];
  searchWorkiis: ReadonlyArray<IWorkii>;
  notFound: boolean;
  searchTerm: string;
  totalResults: number;
  totalSearchResults: number;
}
