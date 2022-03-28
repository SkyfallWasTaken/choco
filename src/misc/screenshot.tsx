import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
} from "slshx";
import { blue, red } from "../design-system/colors";
import { error } from "../design-system/emojis";

type ScreenshotApiResponse = {
	screenshot: string;
};

export function screenshot(): CommandHandler<Env> {
	useDescription("Screenshots a page.");
	const url = useString("url", "The URL of the page to screenshot.", {
		required: true,
	});

	return async function* (_, env) {
		yield;
		try {
			const normalizedUrl = encodeURI(url);
			const response = await fetch(
				`https://shot.screenshotapi.net/screenshot?&url=${normalizedUrl}&output=image&file_type=png&block_ads=true&no_cookie_banners=true&wait_for_event=load`
			);
			const data: any = await response.json();
			if (data.error) throw new Error("response not ok");

			return (
				<Message>
					<Embed
						color={blue()}
						title={normalizedUrl}
						image={response.url}
					/>
				</Message>
			);
		} catch (e) {
			return (
				<Message>
					<Embed color={red()}>{error()} ```{e}```</Embed>
				</Message>
			);
		}
	};
}
