import { IWorkii } from "./workii.interface";
import { IApplicationUser } from '../../modules/dashboard/workiis/interfaces/workii.interface';
export interface IWorkiiState {
  loading: boolean,
  workiis: ReadonlyArray<IWorkii>;
  applications: ReadonlyArray<IApplicationUser>;
  getWorkii: IWorkii | null;
}
