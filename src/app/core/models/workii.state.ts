import { IWorkii } from "./workii.interface";

export interface IWokiiState {
  loading: boolean,
  workiis: ReadonlyArray<IWorkii>;
}
