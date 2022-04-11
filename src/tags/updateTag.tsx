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
import tagLengthRequirements from "../resources/tagLength.json";
import Error from "../components/Error";
import Success from "../components/Success";
import RequiredInGuild from "../components/RequiredInGuild";

export function updateTag(): CommandHandler<Env> {
	useDescription("Updates a tag");
	const [nameId, nameValue] = useInput();
	const [contentId, contentValue] = useInput();

	const modalId = useModal<Env>(async (interaction, env) => {
		if (!interaction.guild_id) {
			return (
				<Message>
					<RequiredInGuild name="tag update" />
				</Message>
			);
		}

		const tagName = nameValue.trim().replaceAll(" ", "-");
		const tagKey = `${interaction.guild_id}::${tagName.toLowerCase()}`;
		const rawTag = await env.TAGS.get(tagKey);
		if (!rawTag) {
			return (
				<Message ephemeral>
					<Error error="Tag does not exist!" />
				</Message>
			);
		}

		const tagObject = JSON.parse(rawTag);

		if (tagObject.author != interaction.member!.user.id) {
			return (
				<Message ephemeral>
					<Error error="You are not the owner of this tag!"></Error>
				</Message>
			);
		}

		tagObject.content = contentValue; // Saves an allocation

		await env.TAGS.put(tagKey, JSON.stringify(tagObject));

		return (
			<Message>
				<Success message="Successfully updated tag!"></Success>
			</Message>
		);
	});

	return () => (
		<Modal id={modalId} title="Update Tag">
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
