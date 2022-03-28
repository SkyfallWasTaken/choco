import {
	CommandHandler,
	useDescription,
	useString,
	Message,
	Button,
	createElement,
} from "slshx";
import fetchUser from "../util/fetchUser";

export function readTag(): CommandHandler<Env> {
	useDescription("View a tag");
	const tagName = useString("tag", "The name of the tag", {
		required: true,
	});

	return async (interaction, env) => {
		const rawTag = await env.TAGS.get(
			`${interaction.guild_id}::${tagName.toLowerCase()}`
		);

		if (!rawTag) {
			return <Message>Tag `{tagName}` does not exist.</Message>;
		}

		const tagObject = JSON.parse(rawTag);

		const { username, discriminator } = await fetchUser(
			interaction.member!.user.id,
			env.BOT_TOKEN
		);
		return (
			<Message allowedMentions={{ parse: [] }}>
				{tagObject.content}
				<Button id="fakebutton" primary disabled>
					Author: {username}#{discriminator}
				</Button>
			</Message>
		);
	};
}
