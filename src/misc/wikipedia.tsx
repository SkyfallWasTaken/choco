import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
	Button,
} from "slshx";
import fetchWikipedia from "../util/wikipediaRequest";
import { blue } from "../design-system/colors";
import Error from "../components/Error";

type PageSummary = {
	type: string;
	displaytitle: string;
	description: string;
	content_urls: {
		mobile: {
			page: string;
		};
	};
	extract: string;
	originalimage?: {
		source: string;
	};
};

type Search = [string, string[]];

async function DefinitionEmbed({
	displaytitle: displayTitle,
	description,
	content_urls: contentUrls,
	extract: summary,
	originalimage,
}: PageSummary) {
	return (
		<Message>
			<Embed
				color={blue()}
				title={displayTitle}
				image={originalimage ? originalimage.source : ""}
			>
				**Description:** {description}
				{"\n\n"}
				{summary}
			</Embed>
			<Button url={contentUrls.mobile.page}>Open in Wikipedia</Button>
		</Message>
	);
}

export function wikipediaRandom(): CommandHandler<Env> {
	useDescription("Gets a random page from Wikipedia.");

	return async function* () {
		yield;

		const page: PageSummary = await (
			await fetchWikipedia("/page/random/summary")
		).json();
		return <DefinitionEmbed {...page}></DefinitionEmbed>;
	};
}

export function wikipediaLookup(): CommandHandler<Env> {
	useDescription("Lookup a page on Wikipedia.");
	const pageName = useString<Env>("page", "The page to look up.", {
		required: true,
		async autocomplete() {
			console.log(1);
			const searchParams = new URLSearchParams({
				action: "opensearch",
				format: "json",
				formatversion: "2",
				search: pageName,
				namespace: "0",
				limit: "5",
			});
			const search = await fetchWikipedia(`?${searchParams}`, true);
			const searchResult: string[] = ((await search.json()) as Search)[1];

			return searchResult;
		},
	});

	return async function* () {
		yield;
		const page = await fetchWikipedia(
			`/page/summary/${encodeURIComponent(pageName)}?redirect=false`
		);
		const pageData: PageSummary = await page.json();
		if (page.status === 404)
			return (
				<Message>
					<Error error={`Page ${pageName} not found.`}></Error>
				</Message>
			);
		if (pageData.type != "standard") {
			return (
				<Message>
					This article is a **{pageData.type}**, please narrow down
					your search.
				</Message>
			);
		}

		return <DefinitionEmbed {...pageData}></DefinitionEmbed>;
	};
}
