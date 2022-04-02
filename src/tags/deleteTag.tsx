import {
	CommandHandler,
	useDescription,
	useString,
	Message,
	createElement,
} from "slshx";
import getGuild from "../util/getGuild";
import Error from "../components/Error";

export function deleteTag(): CommandHandler<Env> {
	useDescription("Deletes a tag");
	const tagName = useString("tag", "The name of the tag", {
		required: true,
	});

	return async (interaction, env) => {
		const tagKey = `${interaction.guild_id}::${tagName.toLowerCase()}`;

		const rawTag = await env.TAGS.get(tagKey);

		if (!rawTag) {
			return (
				<Message>
					<Error error={`Tag ${tagName} does not exist.`}></Error>
				</Message>
			);
		}

		const tagObject = JSON.parse(rawTag);

		const userId = interaction.member!.user.id;
		const ownerId = await getGuild(interaction.guild_id!, env.BOT_TOKEN);
		if (tagObject.author != (userId || ownerId))
			return <Message><Error error="You don't own this tag."></Error></Message>;

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
