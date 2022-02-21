type User = { username: string; discriminator: string };

export default async function (id: string, token: string): Promise<User> {
	const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
		headers: {
			Authorization: `Bot ${token}`,
		},
	});

	if (!response.ok) throw new Error(`Error status code: ${response.status}`);
	return await response.json();
}
 
