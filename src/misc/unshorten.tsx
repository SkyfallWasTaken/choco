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

export function unshorten(): CommandHandler<Env> {
	useDescription("Un-shorten a link (e.g. bit.ly, goo.gl)");
	const url = useString("url", "The shortened URL.", { required: true });

	return async () => {
		const response = await fetch(
			`https://linkunshorten.com/api/link?url=${encodeURIComponent(url)}`
		);
		const unshortened: string = await response.json();

		return (
			<Message>
				<Embed footer="Powered by linkunshorten.com" color={blue()}>
					**Original URL**{"\n"}
					```{encodeURI(url)}```{"\n"}
					**Unshortened URL**{"\n"}
					```{unshortened}```
				</Embed>
			</Message>
		);
	};
}
