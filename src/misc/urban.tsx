import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Fragment,
	Embed,
	Field,
	Button,
	Row,
} from "slshx";
import { blue } from "../design-system/colors";
import trim from "../util/trim";

type Definition = {
	definition: string;
	permalink: string;
	author: string;
	example: string;
	thumbs_up: number;
	thumbs_down: number;
	word: string;
};
const LINK_REGEX = /\[([^\]]+)]/g;
const SQUARE_BRACKET_REGEX = /\[]/g;
const linkToFormatted = (s: string) =>
	trim(
		s.replace(LINK_REGEX, (match) => {
			const word = match.replace(SQUARE_BRACKET_REGEX, "");
			const parameters = new URLSearchParams({ term: word });
			return `[**${word}**](https://urbandictionary.com/define.php?${parameters})`;
		}),
		1024,
	);

function DefinitionEmbed({
	definition,
	permalink,
	author,
	example,
	thumbs_up: thumbsUp,
	thumbs_down: thumbsDown,
	word,
}: Definition) {
	return (
		<>
			<Embed
				color={blue()}
				title={word}
				url={permalink}
				author={author + " on Urban Dictionary"}
			>
				<Field name="Definition">{linkToFormatted(definition)}</Field>
				<Field name="Example">{linkToFormatted(example)}</Field>
			</Embed>
			<Row>
				<Button id="0" primary disabled>
					👍 {thumbsUp}
				</Button>
				<Button id="1" primary disabled>
					👎 {thumbsDown}
				</Button>
			</Row>
		</>
	);
}

export function urbanLookup(): CommandHandler<Env> {
	useDescription("Get a definition from the Urban Dictionary.");
	const term = useString("word", "The word to look up.", {
		required: true,
	});
	return async function* () {
		yield;
		const query = new URLSearchParams({ term });

		const response = await fetch(
			`https://api.urbandictionary.com/v0/define?${query}`,
			{
				cf: {
					cacheTtl: 100,
				},
			},
		);
		const { list: definitions } = await response.json();
		if (definitions.length === 0) {
			return <Message>No result found.</Message>;
		}

		const definition: Definition = definitions[0];

		return (
			<Message>
				<DefinitionEmbed {...definition}></DefinitionEmbed>
			</Message>
		);
	};
}

export function urbanRandom(): CommandHandler<Env> {
	useDescription("Get a random word from the Urban Dictionary.");
	return async () => {
		const response = await fetch(
			"https://api.urbandictionary.com/v0/random",
		);
		const { list: definitions } = await response.json();
		const definition: Definition = definitions[0];
		return (
			<Message>
				<DefinitionEmbed {...definition}></DefinitionEmbed>
			</Message>
		);
	};
}
