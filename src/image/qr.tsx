import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
	useAttachment,
} from "slshx";
import { blue } from "../design-system/colors";
import Error from "../components/Error";

export function qrEncode(): CommandHandler<Env> {
	useDescription("Generate a QR code.");
	const text = useString(
		"text",
		"The text/URL to be encoded into a QR code.",
		{
			required: true,
		},
	);

	return async function () {
		return (
			<Message>
				<Embed
					color={blue()}
					title="QR Code"
					image={`https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${encodeURIComponent(
						text,
					)}`}
				>
					Scan the QR code using your phone or the `/qr decode`
					command.
				</Embed>
			</Message>
		);
	};
}

type QRDecodeResponse = [
	{ type: string; symbol: [{ seq: number; data?: string; error?: string }] },
];

export function qrDecode(): CommandHandler<Env> {
	useDescription("Decode a QR code.");
	const qr = useAttachment("qr", "The QR code to be decoded.", {
		required: true,
	});

	return async function* () {
		yield;
		if (qr.content_type != ("image/png" || "image/jpeg")) {
			return (
				<Message>
					<Error error="Please send an image to scan for QR codes."></Error>
				</Message>
			);
		}

		const parameters = new URLSearchParams({ fileurl: qr.proxy_url });
		const response = await fetch(
			`http://api.qrserver.com/v1/read-qr-code/?${parameters}`,
		);
		const data: QRDecodeResponse = await response.json();
		const symbol = data[0].symbol[0];
		if (!symbol.data) {
			return (
				<Message>
					<Error error="Could not find a QR code in that image."></Error>
				</Message>
			);
		}

		return (
			<Message>
				<Embed color={blue()} title="QR Code decoded!">
					```{symbol.data}```
				</Embed>
			</Message>
		);
	};
}
