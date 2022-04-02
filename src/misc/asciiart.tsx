import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
} from "slshx";
import * as figlet from "figlet";
// @ts-ignore The font does exist, but @types/figlet is out-of-date
import standard from "figlet/importable-fonts/Standard";

export function asciiart(): CommandHandler<Env> {
	useDescription("Generates some ASCII art!");
	const text = useString("text", "The text to turn into ASCII art.", {
		required: true,
	});
	figlet.parseFont("Standard", standard);

	return async function* () {
		yield;

		const file = new File([figlet.textSync(text)], "art.txt", {
			type: "text/plain",
		});
		return <Message attachments={[file]}></Message>;
	};
}
