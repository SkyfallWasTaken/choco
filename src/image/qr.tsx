import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
} from "slshx";

export function qr(): CommandHandler<Env> {
	useDescription("Generate a QR code.");
	const text = useString(
		"text",
		"The text/URL to be encoded into a QR code.",
		{
			required: true,
		}
	);

	return async function (_, env) {
		const response = await fetch(
			`https://easyqr-1.skyfalldev.workers.dev/`,
			{
				method: "POST",
				body: JSON.stringify({
					text,
				}),
			}
		);
		const blob = await response.blob();
		const file = new File([blob], "qr.png", { type: "image/png" });
		return <Message attachments={[file]}></Message>;
	};
}
