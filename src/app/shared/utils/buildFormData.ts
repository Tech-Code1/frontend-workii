export function buildFormData(DtoObj: any): FormData {
	let formData = new FormData();
	let paramNames = Object.getOwnPropertyNames(DtoObj);

	for (let i = 0; i < paramNames.length; i++) {
		if (!paramNames || !DtoObj[paramNames[i]]) {
			continue;
		}
		formData.append(paramNames[i], DtoObj[paramNames[i]]);
	}

	console.log(formData);

	return formData;
}
