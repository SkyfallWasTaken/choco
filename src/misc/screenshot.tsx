import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
} from "slshx";
import Error from "../components/Error";
import isNsfw from "../util/isNsfw";

export function screenshot(): CommandHandler<Env> {
	useDescription("Screenshots a page.");
	const url = useString("url", "The URL of the page to screenshot.", {
		required: true,
	});

	return async function* () {
		yield;
		const imageUrl = `https://s0.wp.com/mshots/v1/${url}`;
		await fetch(imageUrl); // Get the image to load
		const response = await fetch(imageUrl, {
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows; U; Windows)",
			},
		});
		const blob = await response.blob();
		const file = new File([blob], "screenshot.jpg", {
			type: "image/jpeg",
		});

		const isScreenshotNsfw = await isNsfw(file);
		const data: { success: boolean; nsfw: boolean } =
			await isScreenshotNsfw.json();

		if (!data.success) {
			return (
				<Message>
					<Error error="Failed to detect if screenshot is NSFW, please try again."></Error>
				</Message>
			);
		}

		if (data.nsfw) {
			return (
				<Message>
					<Error error="This screenshot was detected as NSFW."></Error>
				</Message>
			);
		}

		return <Message attachments={[file]} />;
	};
}
