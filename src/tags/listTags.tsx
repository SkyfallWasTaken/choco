import {
	CommandHandler,
	useDescription,
	createElement,
	Message,
	Fragment,
	Embed,
} from "slshx";
import RequiredInGuild from "../components/RequiredInGuild";
import { blue } from "../design-system/colors";

export function listTags(): CommandHandler<Env> {
	useDescription("Lists all the tags in the server.");
	return async (interaction, env) => {
		if (!interaction.guild_id) {
			return (
				<Message>
					<RequiredInGuild name="tag list" />
				</Message>
			);
		}

		const prefix = `${interaction.guild_id}::`;
		const tags = await env.TAGS.list({
			prefix,
			limit: 150,
		});
		const elements = tags.keys.map((key) => (
			<>
				{key.name.slice(prefix.length)}
				{"\n"}
			</>
		));

		return (
			<Message>
				<Embed
					color={blue()}
					title={`All tags in the server (${elements.length})`}
				>
					```
					{elements}
					{"\n"}
					```
				</Embed>
			</Message>
		);
	};
}
