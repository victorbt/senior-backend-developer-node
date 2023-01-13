export class ApiError extends Error {
	status: number;

	constructor(message: string, status = 400) {
		super();
		this.message = message;
		this.status = status;
	}
}