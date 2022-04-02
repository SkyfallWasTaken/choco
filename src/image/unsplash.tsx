import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
	Row,
	Button,
} from "slshx";
import { blue, red } from "../design-system/colors";

export function unsplash(): CommandHandler<Env> {
	useDescription("Get a random photo from Unsplash.");
	const query = useString(
		"query",
		"The name of the image that you want to get (e.g. sunset)"
	);
	const orientation = useString(
		"orientation",
		"The orientation of the image that you'd like",
		{
			choices: [
				{ name: "Portrait", value: "portrait" },
				{ name: "Landscape", value: "landscape" },
				{ name: "Squarish", value: "squarish" },
			] as const,
		}
	);

	return async (_, env) => {
		const params = new URLSearchParams();
		if (query) params.set("query", query);
		if (orientation) params.set("orientation", orientation);

		const response = await fetch(
			`https://api.unsplash.com/photos/random?${params.toString()}`,
			{
				headers: {
					Authorization: `Client-ID ${env.UNSPLASH_API_KEY}`,
				},
			}
		);

		if (!response.ok)
			return (
				<Message>
					<Embed color={red()} title="Please try again later">
						It seems that Unsplash's API is ratelimiting the bot,
						please try again later.
					</Embed>
				</Message>
			);

		const json: {
			urls: {
				full: string;
			};
			links: {
				self: string;
				html: string;
			};
			description: string;
			downloads: number;
			likes: number;
			user: {
				name: string;
				links: {
					html: string;
				};
			};
		} = await response.json();

		return (
			<Message>
				<Embed image={json.urls.full} color={blue()}>
					**Description:**{" "}
					{json.description || "_no description provided_"}
					{"\n\n"}
					{`Posted by [**${json.user.name}**](${json.user.links.html}) on Unsplash`}
				</Embed>
				<Row>
					<Button id="downloads" disabled primary>
						🔽 Downloads: {json.downloads}
					</Button>
					<Button id="likes" disabled primary>
						👍 Likes: {json.likes}
					</Button>
					<Button url={json.links.html}>View on Unsplash</Button>
				</Row>
			</Message>
		);
	};
}
