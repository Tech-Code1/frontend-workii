export interface IUser {
  id: string;
}

export interface IUserDTO {
  id: string;
  email?: string;
  avatar?: string;
  nick?: string;
  areaOfExpertise?: string[];
  profession: string[];
  isActive?: boolean;
  roles?: string[];
  workiis?: string[];
}
