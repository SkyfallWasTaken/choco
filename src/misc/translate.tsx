// TODO: format this file.
import {
	CommandHandler,
	useDescription,
	useString,
	useModal,
	useInput,
	createElement,
	Message,
	Embed,
	Modal,
	Input,
} from "slshx";
import translateString from "@vitalets/google-translate-api";
import IsoToLatLong from "country-iso-to-coordinates";
import { blue } from "../design-system/colors";

export function translate(): CommandHandler<Env> {
	useDescription("Translate some text.");
	const [textId, textValue] = useInput();
	const modalId = useModal<Env>(async () => {
		const translated = await translateString(textValue, { to: "en" });
		return (
			<Message>
				<Embed
					color={blue()}
					title={`${
						IsoToLatLong[translated.from.language.iso]
					} to English`}
				>
					```{translated.text}```
				</Embed>
			</Message>
		);
	});

	return async () => (
		<Modal id={modalId} title="Send Message">
			<Input
				id={textId}
				label="Text to Translate"
				required
				value="Bonjour!"
				minLength={2}
			/>
		</Modal>
	);
}
