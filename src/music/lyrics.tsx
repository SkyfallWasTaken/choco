// TODO: format this file.
import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
} from "slshx";
import { $fetch } from "ohmyfetch";
import { blue } from "../design-system/colors";
import Error from "../components/Error";

export function lyrics(): CommandHandler<Env> {
	useDescription("Get the lyrics of a song");
	const artist = useString("artist", "The song artist", { required: true });
	const name = useString("name", "The song name", { required: true });

	return async function* () {
		yield;
		const lyrics: { error?: string; lyrics?: string } = await $fetch(
			`https://api.lyrics.ovh/v1/${encodeURIComponent(
				artist,
			)}/${encodeURIComponent(name)}`,
		);
		const title = `${artist} - ${name}`;
		if (lyrics.error) {
			return (
				<Message>
					<Error
						error={`Couldn't find lyrics for \`${title}\`.`}
					></Error>
				</Message>
			);
		}

		return (
			<Message>
				<Embed
					color={blue()}
					title={title}
					footer="Powered by lyrics.ovh"
				>
					{lyrics.lyrics}
				</Embed>
			</Message>
		);
	};
}
