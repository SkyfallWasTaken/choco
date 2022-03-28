import {
	Message,
	UserCommandHandler,
	createElement,
	Embed,
} from "slshx";

export function avatarUserCommand(): UserCommandHandler {
	const cdnUrl = "https://cdn.discordapp.com";
	return (_interaction, _env, _ctx, user) => {
		const { id, avatar, username, discriminator } = user;
		let avatarUrl = cdnUrl;
		avatarUrl += !avatar
			? `/embed/avatars/${parseInt(discriminator) % 5}.png`
			: `/avatars/${id}/${avatar}.png?size=256`;

		return (
			<Message ephemeral>
				<Embed
					title={`${username}#${discriminator}'s avatar!`}
					image={avatarUrl}
				/>
			</Message>
		);
	};
}
