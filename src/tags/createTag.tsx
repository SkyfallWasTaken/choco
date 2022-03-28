import {
	CommandHandler,
	useDescription,
	useModal,
	useInput,
	Message,
	Modal,
	Input,
	createElement,
} from "slshx";
import tagLengthRequirements from "../resources/tagLength.json"

export function createTag(): CommandHandler<Env> {
	useDescription("Creates a tag");
	const [nameId, nameValue] = useInput();
	const [contentId, contentValue] = useInput();

	const modalId = useModal<Env>(async (interaction, env) => {
		const tagName = nameValue.trim().replace(" ", "-");
		const tagKey = `${interaction.guild_id}::${tagName.toLowerCase()}`;

		if (await env.TAGS.get(tagKey))
			return <Message>Tag {tagName} already exists!</Message>;
		try {
			await env.TAGS.put(
				tagKey,
				JSON.stringify({
					content: contentValue,
					author: interaction.member!.user.id,
				})
			);
			return (
				<Message>
					Successfully created tag! Check it out with `/tag view{" "}
					{tagName}`
				</Message>
			);
		} catch {
			return <Message>Failed to create tag! Please try again.</Message>;
		}
	});

	return () => (
		<Modal id={modalId} title="Create Tag">
			<Input
				id={nameId}
				label="Name"
				required
				minLength={tagLengthRequirements.min.name}
				maxLength={tagLengthRequirements.max.name}
			/>
			<Input
				id={contentId}
				label="Tag Content"
				placeholder="Free vbucks: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
				required
				minLength={tagLengthRequirements.min.content}
				maxLength={tagLengthRequirements.max.content}
				paragraph
			/>
		</Modal>
	);
}
