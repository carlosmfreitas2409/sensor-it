import { TextEncoder } from 'node:util';

export class HttpStream {
	private bytesWritten = 0;
	private writer: WritableStreamDefaultWriter;
	private encoder: TextEncoder;

	constructor(writable: WritableStream) {
		this.writer = writable.getWriter();
		this.encoder = new TextEncoder();
	}

	write(str: string) {
		const bytes = this.encoder.encode(str);
		this.bytesWritten += bytes.length;
		this.writer.write(bytes);
		return this;
	}

	writeln(str: string) {
		return this.write(`${str}\n`);
	}

	writeJson<T = unknown>(json: T) {
		this.writeln(JSON.stringify(json));
		// this.flush()
	}

	flush() {
		const bytesNeeded = 4096 - (this.bytesWritten % 4096);
		const BACKSPACE = 8;

		this.writer.write(new Uint8Array(bytesNeeded).fill(BACKSPACE));
		this.bytesWritten = 0;
	}

	close() {
		this.writer.close();
	}
}

export function textStream(
	callback: (stream: HttpStream) => Promise<void>,
	headers?: ResponseInit['headers'],
) {
	const { readable, writable } = new TransformStream();
	const stream = new HttpStream(writable);

	callback(stream).finally(() => stream.close());

	const response = new Response(readable);

	for (const [key, value] of Object.entries(headers || {})) {
		response.headers.set(key, value);
	}

	return response;
}
