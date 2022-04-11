import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
	Field,
} from "slshx";
import {
	autocomplete,
	AutocompleteResult,
	SafeSearchType,
	search as searchDDG,
	SearchResult,
} from "duck-duck-scrape";
import { decode } from "html-entities";
import { stripHtml } from "string-strip-html";
import { blue } from "../design-system/colors";
import Error from "../components/Error";

export default function SearchResultElement({
	result,
}: {
	result: SearchResult;
}) {
	return (
		<Field name={result.hostname}>
			**[{decode(result.title)}]({result.url})**{"\n"}
			{stripHtml(decode(result.description)).result}
		</Field>
	);
}

export function search(): CommandHandler<Env> {
	useDescription("Search the web with DuckDuckGo.");
	const query = useString("query", "What to look up", {
		required: true,
		async autocomplete() {
			if (query.length === 0) {
				return [
					{
						name: "Type something for auto-completion!",
						value: "why u clicking me",
					},
				];
			}

			const autocompleteResults: AutocompleteResult[] =
				await autocomplete(query);
			return autocompleteResults.map((result) => result.phrase);
		},
	});

	return async function* () {
		yield;

		const results = await searchDDG(query, {
			safeSearch: SafeSearchType.STRICT,
		});

		if (results.noResults) {
			return (
				<Message>
					<Error
						error={`Couldn't find any results for \`${query}\``}
					></Error>
				</Message>
			);
		}

		const elements = results.results
			.slice(0, 10)
			.map((result) => <SearchResultElement result={result} />);
		return (
			<Message>
				<Embed color={blue()} title={`Results for \`${query}\``}>
					{elements}
				</Embed>
			</Message>
		);
	};
}
