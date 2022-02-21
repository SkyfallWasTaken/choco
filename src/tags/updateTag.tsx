import {
	CommandHandler,
	useDescription,
	useModal,
	useInput,
	useString,
	Message,
	Modal,
	Input,
	createElement,
} from "slshx";

export function updateTag(): CommandHandler<Env> {
	useDescription("Updates a tag");
	const [nameId, nameValue] = useInput();
	const [contentId, contentValue] = useInput();

	const modalId = useModal<Env>(async (interaction, env) => {
		const tagName = nameValue.trim().replace(" ", "-");
		const tagKey = `${interaction.guild_id}::${tagName.toLowerCase()}`;
		const rawTag = await env.TAGS.get(tagKey);
		if (!rawTag) return <Message ephemeral>Tag does not exist!</Message>;

		const tagObject = JSON.parse(rawTag);

		if (tagObject.author != interaction.member!.user.id)
			return (
				<Message ephemeral>You are not the owner of this tag!</Message>
			);

		tagObject.content = contentValue; // saves an allocation

		await env.TAGS.put(tagKey, JSON.stringify(tagObject));

		return () => {
			<Message>Updated tag!</Message>;
		};
	});

	return () => (
		<Modal id={modalId} title="Create Tag">
			<Input
				id={nameId}
				label="Name"
				required
				minLength={5}
				maxLength={12}
			/>
			<Input
				id={contentId}
				label="Tag Content"
				placeholder="Free vbucks: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
				required
				minLength={12}
				maxLength={1000}
				paragraph
			/>
		</Modal>
	);
}
