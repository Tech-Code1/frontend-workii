export interface IUser {
	id: string;
}

export interface IUserDto {
	id: string;
	email?: string;
	avatar?: string;
	nick?: string;
	areaOfExpertise?: string[];
	profession: string[];
	isActive?: boolean;
	roles?: string[];
	timeOfCreation: number;
	workiis?: string[];
}
