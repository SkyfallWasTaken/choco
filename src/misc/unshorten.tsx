// TODO: format this file.
import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
} from "slshx";
import { blue } from "../design-system/colors";
import ErrorEmbed from "../components/Error";

export function unshorten(): CommandHandler<Env> {
	useDescription("Un-shorten a link (e.g. bit.ly, goo.gl)");
	const url = useString("url", "The shortened URL.", { required: true });

	return async () => {
		try {
			new URL(url);
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("response not ok");
			}

			const unshortened = response.url;

			return (
				<Message>
					<Embed color={blue()}>
						**Original URL**{"\n"}
						```{encodeURI(url)}```{"\n"}
						**Unshortened URL**{"\n"}
						```{unshortened}```
					</Embed>
				</Message>
			);
		} catch (error) {
			console.log(error);
			return (
				<Message>
					<ErrorEmbed error="Invalid URL."></ErrorEmbed>
				</Message>
			);
		}
	};
}
