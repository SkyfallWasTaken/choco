export default (stream: NodeJS.ReadableStream) => {
	return new Promise((resolve, reject) => {
		let chunks: any[] = [];

		stream.on("data", function (chunk) {
			chunks.push(chunk);
		});
		stream.once("end", function () {
			resolve(Buffer.concat(chunks));
		});
		stream.once("error", function (err) {
			reject(err)
		});
	});
};
