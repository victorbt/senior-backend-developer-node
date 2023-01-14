export interface Exception extends Error {
	status: number;
}

export  class ApiError extends Error implements Exception {
	message: string="";
	status: number=400;
	name: string="";

	constructor(message: string, status: number){
		super()
		this.message=message,this.status=status
	}
}
