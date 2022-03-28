import type { APIGuild } from "discord-api-types/v9";

export default async function (guildId: string): Promise<APIGuild> {
	const response = await fetch(
		`https://discord.com/api/v9/guilds/${guildId}`
	);
    if (!response.ok) throw new Error("Ratelimit.")
	return await response.json();
}
