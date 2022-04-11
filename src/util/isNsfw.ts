export default async function (file: File) {
	const form = new FormData();
	form.append("file", file);

	const response = await fetch("https://api.unscan.co/nsfw", {
		method: "POST",
		body: form,
	});

	return response;
}
