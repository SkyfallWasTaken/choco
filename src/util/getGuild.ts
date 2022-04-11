import type { APIGuild } from "discord-api-types/v9";

export default async function (
	guildId: string,
	token: string,
): Promise<APIGuild> {
	console.log(token);
	const response = await fetch(
		`https://discord.com/api/v9/guilds/${guildId}`,
		{
			headers: {
				Authorization: token,
			},
		},
	);
	if (!response.ok) {
		throw new Error("[getGuild] Error: " + (await response.text()));
	}

	return response.json();
}
