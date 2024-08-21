type HttpExceptionProps = {
	message: string;
	statusCode: number;
};

export class HttpException extends Error {
	private _statusCode: number;

	constructor(props: HttpExceptionProps) {
		super(props.message);

		this._statusCode = props.statusCode;
	}

	get statusCode() {
		return this._statusCode;
	}

	toResponse() {
		return { message: this.message };
	}
}
