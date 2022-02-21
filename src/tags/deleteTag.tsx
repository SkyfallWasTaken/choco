import {
	CommandHandler,
	useDescription,
	useString,
	Message,
	Button,
	createElement,
} from "slshx";
import fetchUser from "../util/fetchUser";

export function deleteTag(): CommandHandler<Env> {
	useDescription("Deletes a tag");
	const tagName = useString("name", "The name of the tag", {
		required: true,
	});

	return async (interaction, env) => {
		const tagKey = `${interaction.guild_id}::${tagName.toLowerCase()}`;

		const rawTag = await env.TAGS.get(tagKey);

		if (!rawTag) {
			return <Message>Tag `{tagName}` does not exist.</Message>;
		}

		const tagObject = JSON.parse(rawTag);

		const userId = interaction.member!.user.id;
		if (tagObject.author != userId)
			return <Message>You don't own this tag!</Message>;

		const file = new File([tagObject.content], "deletedTag.txt", {
			type: "text/plain",
		});

		await env.TAGS.delete(tagKey);

		return (
			<Message attachments={[file]}>
				Deleted tag. If you want to create it again, download the file,
				copy the contents, and then create a new tag.
			</Message>
		);
	};
}
