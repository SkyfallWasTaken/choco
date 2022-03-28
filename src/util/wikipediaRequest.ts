const REST_PREFIX = "https://en.wikipedia.org/api/rest_v1";
const LEGACY_PREFIX = "https://en.wikipedia.org/w/api.php";

export default async function (endpoint: string, legacy: boolean = false) {
	const url = legacy
		? `${LEGACY_PREFIX}${endpoint}`
		: `${REST_PREFIX}${endpoint}`;
	const response = await fetch(url, {
		headers: {
			"User-Agent": "ChocoBot <mahadkalam1234@gmail.com>",
		},
	});
    if (!response.ok) throw new Error("ratelimit")
	return response;
}
