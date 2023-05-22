export interface IResponseError {
	error?: IError;
	headers?: IHeaders;
	message?: string;
	name?: string;
	ok?: boolean;
	status?: number;
	statusText?: string;
	url?: string;
}

export interface IError {
	message: string;
}

export interface IHeaders {
	lazyInit: () => {};
	lazyUpdate: null;
	normalizedNames: number[];
}
