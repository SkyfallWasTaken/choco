import type { APIUser } from "discord-api-types/v9";

export default async function (id: string, token: string): Promise<APIUser> {
	const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
		headers: {
			Authorization: `Bot ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error(`Error status code: ${response.status}`);
	}

	return response.json();
}
