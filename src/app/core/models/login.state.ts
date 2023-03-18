import { IWorkii } from "./workii.interface";
import { IApplicationUser } from '../../modules/dashboard/workiis/interfaces/workii.interface';
import { loginDTO } from "src/app/modules/auth/DTOs/loginDTO";
export interface ILoginState {
  login: loginDTO,
}
