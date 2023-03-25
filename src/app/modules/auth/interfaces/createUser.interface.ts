export interface ICreateUser {
  avatar?: string;
  nick?: string;
  areaOfExpertise?: string;
  profession?: string;
  password?: string;
}

export interface ICreateUserResponse {
  id: string;
  email: string;
  password: string;
  avatar: string;
  nick: string;
  areaOfExpertise: string;
  profession: string;
  timeOfCreation: number;
  workiis: string[];
  isActive: boolean;
  roles: string[];
  token: string;
}
