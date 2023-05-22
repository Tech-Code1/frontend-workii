export enum NotificationType {
	success,
	error
}

export interface INotification {
	type: NotificationType;
	message: string;
}
