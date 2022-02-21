type User = { username: string; discriminator: string };

export default async function (id: string): Promise<User> {
	const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
		headers: {
			Authorization: `Bot Njc1MDY2NzYzODg0NjI1OTYw.Xjxu6g.FIrRp7MB_wQ686p9B9xAZFqNQnQ`,
		},
	});

	if (!response.ok) throw new Error(`Error status code: ${response.status}`);
	return await response.json();
}
