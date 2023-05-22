export function parseErrorsFromResponse(responseObj: any): string[] {
	let errors: string[] = [];

	if (responseObj.error) {
		if (responseObj.error.errors) {
			let indexes = Object.getOwnPropertyNames(responseObj.error.errors);

			for (let i = 0; i < indexes.length; i++) {
				let paramName = responseObj.error.errors[indexes[i]]?.param;
				let message = responseObj.error.errors[indexes[i]]?.msg;
				if (paramName && message) {
					errors.push(`${paramName} : ${message}`);
				}
			}
		} else if (responseObj.error.error) {
			errors.push(responseObj.error.error);
		}
	}

	return errors;
}
