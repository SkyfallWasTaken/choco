import {
	CommandHandler,
	useDescription,
	useString,
	Message,
	createElement,
} from "slshx";

export function readTag(): CommandHandler<Env> {
	useDescription("View a tag");
	const tagName = useString("name", "The name of the tag", {
		required: true,
	});

	return async (interaction, env) => {
		const tagContent = await env.TAGS.get(
			`${interaction.guild_id}::${tagName.toLowerCase()}`
		);

		if (!tagContent) {
			return <Message>Tag `{tagName}` does not exist.</Message>;
		}

		return <Message>{tagContent}</Message>;
	};
}
